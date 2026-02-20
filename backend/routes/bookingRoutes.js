const express = require('express');
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Email template
const createBookingEmailTemplate = (booking) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #d4af37, #f4d03f); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #000; margin: 0; font-size: 28px;">RestoBook</h1>
        <p style="color: #000; margin: 10px 0 0 0; font-size: 16px;">Table Reservation Confirmed</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Dear ${booking.name},</h2>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
          Thank you for choosing RestoBook! Your table reservation has been confirmed. We look forward to providing you with an exceptional dining experience.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Reservation Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Date:</td><td style="padding: 8px 0; color: #666;">${new Date(booking.date).toLocaleDateString()}</td></tr>
            <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Time:</td><td style="padding: 8px 0; color: #666;">${booking.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Guests:</td><td style="padding: 8px 0; color: #666;">${booking.guests} ${booking.guests === 1 ? 'Guest' : 'Guests'}</td></tr>
            <tr><td style="padding: 8px 0; color: #333; font-weight: bold;">Status:</td><td style="padding: 8px 0; color: #28a745; font-weight: bold;">Confirmed</td></tr>
          </table>
          ${booking.specialRequests ? `<p style="margin-top: 15px; color: #333;"><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 25px 0;">
          <h4 style="color: #856404; margin-top: 0;">Important Reminders:</h4>
          <ul style="color: #856404; margin: 0; padding-left: 20px;">
            <li>Please arrive 10 minutes before your reservation time</li>
            <li>Reservations are held for 15 minutes past booking time</li>
            <li>For cancellations, please contact us 24 hours in advance</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; margin-bottom: 15px;">Questions? Contact us:</p>
          <p style="color: #d4af37; font-weight: bold; margin: 5px 0;">📞 +1 (555) 123-4567</p>
          <p style="color: #d4af37; font-weight: bold; margin: 5px 0;">✉️ reservations@restobook.com</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 0;">Thank you for choosing RestoBook</p>
        </div>
      </div>
    </div>
  `;
};

// Get all bookings (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new booking (authenticated users only)
router.post('/', protect, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user._id,
      status: 'confirmed'
    });
    const savedBooking = await booking.save();
    
    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@restobook.com',
        to: booking.email,
        subject: 'Table Reservation Confirmed - RestoBook',
        html: createBookingEmailTemplate(booking)
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent to:', booking.email);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }
    
    res.status(201).json({ 
      message: 'Your table has been successfully booked! Check your email for confirmation.', 
      booking: savedBooking 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;