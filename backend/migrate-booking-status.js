// Migration Script: Update Booking Status to Uppercase
// Run this once to migrate existing bookings from lowercase to uppercase status

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

const migrateBookingStatus = async () => {
  try {
    console.log('🔄 Starting migration...\n');

    // Update pending → PENDING
    const pendingResult = await mongoose.connection.db.collection('bookings').updateMany(
      { status: 'pending' },
      { $set: { status: 'PENDING' } }
    );
    console.log(`✅ Updated ${pendingResult.modifiedCount} bookings: pending → PENDING`);

    // Update confirmed → CONFIRMED
    const confirmedResult = await mongoose.connection.db.collection('bookings').updateMany(
      { status: 'confirmed' },
      { $set: { status: 'CONFIRMED' } }
    );
    console.log(`✅ Updated ${confirmedResult.modifiedCount} bookings: confirmed → CONFIRMED`);

    // Update cancelled → REJECTED
    const cancelledResult = await mongoose.connection.db.collection('bookings').updateMany(
      { status: 'cancelled' },
      { $set: { status: 'REJECTED' } }
    );
    console.log(`✅ Updated ${cancelledResult.modifiedCount} bookings: cancelled → REJECTED`);

    // Verify migration
    const statusCounts = await mongoose.connection.db.collection('bookings').aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]).toArray();

    console.log('\n📊 Current Status Distribution:');
    statusCounts.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });

    console.log('\n✅ Migration completed successfully!');
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
  await migrateBookingStatus();
})();
