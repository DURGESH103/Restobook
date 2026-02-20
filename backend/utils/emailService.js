const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailTemplates = {
  pending: (booking) => ({
    subject: 'Booking Received - Pending Approval | RestoBook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #d4af37, #f4d03f); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #000; margin: 0;">RestoBook</h1>
          <p style="color: #000; margin: 10px 0 0 0;">Booking Received</p>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333;">Dear ${booking.name},</h2>
          <p style="color: #666;">Thank you for choosing RestoBook! Your booking request has been received and is pending approval.</p>
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d4af37; margin-top: 0;">Booking Details</h3>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Status:</strong> <span style="color: #ffc107;">⏳ PENDING APPROVAL</span></p>
          </div>
          <p style="color: #666;">We'll notify you once your booking is confirmed by our team.</p>
        </div>
      </div>
    `
  }),
  
  confirmed: (booking) => ({
    subject: 'Booking Confirmed ✅ | RestoBook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">✅ Booking Confirmed!</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333;">Dear ${booking.name},</h2>
          <p style="color: #666;">Great news! Your table reservation has been confirmed.</p>
          <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">Confirmed Reservation</h3>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Status:</strong> <span style="color: #28a745;">✅ CONFIRMED</span></p>
          </div>
          <p style="color: #666;">Please arrive 10 minutes before your reservation time. We look forward to serving you!</p>
        </div>
      </div>
    `
  }),
  
  rejected: (booking) => ({
    subject: 'Booking Update | RestoBook',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc3545, #c82333); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Booking Update</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333;">Dear ${booking.name},</h2>
          <p style="color: #666;">We regret to inform you that we cannot accommodate your booking request for the selected date and time.</p>
          <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
          </div>
          <p style="color: #666;">Please try booking for a different date or time. We apologize for any inconvenience.</p>
        </div>
      </div>
    `
  })
};

const sendBookingEmail = async (booking, status) => {
  try {
    const template = emailTemplates[status.toLowerCase()];
    if (!template) return;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@restobook.com',
      to: booking.email,
      ...template(booking)
    };

    await transporter.sendMail(mailOptions);
    console.log(`${status} email sent to:`, booking.email);
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
};

module.exports = { sendBookingEmail };
