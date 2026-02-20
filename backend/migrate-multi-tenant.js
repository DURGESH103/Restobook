// Migration Script: Convert to Multi-Tenant Architecture
// Run this ONCE to migrate existing data

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const migrateToMultiTenant = async () => {
  try {
    console.log('🔄 Starting multi-tenant migration...\n');

    // 1. Update User roles: lowercase to uppercase
    const userResult = await mongoose.connection.db.collection('users').updateMany(
      { role: 'user' },
      { $set: { role: 'USER' } }
    );
    console.log(`✅ Updated ${userResult.modifiedCount} users: user → USER`);

    const adminResult = await mongoose.connection.db.collection('users').updateMany(
      { role: 'admin' },
      { $set: { role: 'ADMIN' } }
    );
    console.log(`✅ Updated ${adminResult.modifiedCount} admins: admin → ADMIN`);

    // 2. Get first admin to assign as default owner
    const firstAdmin = await mongoose.connection.db.collection('users').findOne({ role: 'ADMIN' });
    
    if (!firstAdmin) {
      console.log('⚠️  No admin found. Please create an admin user first.');
      return;
    }

    console.log(`\n📌 Using admin "${firstAdmin.name}" (${firstAdmin.email}) as default owner\n`);

    // 3. Add owner field to existing menu items
    const menuResult = await mongoose.connection.db.collection('menuitems').updateMany(
      { owner: { $exists: false } },
      { $set: { owner: firstAdmin._id } }
    );
    console.log(`✅ Updated ${menuResult.modifiedCount} menu items with owner field`);

    // 4. Add owner field to existing bookings
    const bookingResult = await mongoose.connection.db.collection('bookings').updateMany(
      { owner: { $exists: false } },
      { $set: { owner: firstAdmin._id } }
    );
    console.log(`✅ Updated ${bookingResult.modifiedCount} bookings with owner field`);

    // 5. Verify migration
    console.log('\n📊 Verification:');
    
    const userCount = await mongoose.connection.db.collection('users').countDocuments({ role: 'USER' });
    const adminCount = await mongoose.connection.db.collection('users').countDocuments({ role: 'ADMIN' });
    console.log(`   Users: ${userCount} USER, ${adminCount} ADMIN`);

    const menuWithOwner = await mongoose.connection.db.collection('menuitems').countDocuments({ owner: { $exists: true } });
    console.log(`   Menu items with owner: ${menuWithOwner}`);

    const bookingsWithOwner = await mongoose.connection.db.collection('bookings').countDocuments({ owner: { $exists: true } });
    console.log(`   Bookings with owner: ${bookingsWithOwner}`);

    console.log('\n✅ Multi-tenant migration completed successfully!');
    console.log('\n⚠️  IMPORTANT: All existing data is now assigned to:', firstAdmin.email);
    console.log('   New admins will have their own isolated data.');
  } catch (error) {
    console.error('❌ Migration Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

// Run migration
(async () => {
  await connectDB();
  await migrateToMultiTenant();
})();
