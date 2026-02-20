// Quick Fix: Check and Update User Roles
// Run this to see your current role and update it if needed

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected\n');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const checkAndFixRoles = async () => {
  try {
    // Check current roles
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    
    console.log('📋 Current Users:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Status: ${user.role === 'ADMIN' || user.role === 'USER' ? '✅ Correct' : '⚠️  Needs Update'}\n`);
    });

    // Update lowercase roles to uppercase
    const adminUpdate = await mongoose.connection.db.collection('users').updateMany(
      { role: 'admin' },
      { $set: { role: 'ADMIN' } }
    );

    const userUpdate = await mongoose.connection.db.collection('users').updateMany(
      { role: 'user' },
      { $set: { role: 'USER' } }
    );

    if (adminUpdate.modifiedCount > 0 || userUpdate.modifiedCount > 0) {
      console.log('🔄 Updates Applied:');
      if (adminUpdate.modifiedCount > 0) {
        console.log(`   ✅ Updated ${adminUpdate.modifiedCount} admin(s) to ADMIN`);
      }
      if (userUpdate.modifiedCount > 0) {
        console.log(`   ✅ Updated ${userUpdate.modifiedCount} user(s) to USER`);
      }
      console.log('\n✅ All roles are now uppercase!');
    } else {
      console.log('✅ All roles are already correct!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

(async () => {
  await connectDB();
  await checkAndFixRoles();
})();
