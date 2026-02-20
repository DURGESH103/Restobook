import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import './BookingForm.css';

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests) newErrors.guests = 'Number of guests is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      toast.success('Booking request submitted successfully!');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '', specialRequests: '' });
      setErrors({});
    } catch (error) {
      toast.error(error.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="booking-form-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="booking-form-header"
      >
        <h2 className="form-title">Reserve Your Table</h2>
        <p className="form-subtitle">Book your dining experience with us</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            icon={<FiUser />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            icon={<FiMail />}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            icon={<FiPhone />}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
            icon={<FiCalendar />}
            required
            min={new Date().toISOString().split('T')[0]}
          />

          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            error={errors.time}
            icon={<FiClock />}
            required
          />

          <Input
            label="Number of Guests"
            type="number"
            value={formData.guests}
            onChange={(e) => handleChange('guests', e.target.value)}
            error={errors.guests}
            icon={<FiUsers />}
            required
            min="1"
            max="20"
          />
        </div>

        <div className="form-full">
          <div className="textarea-wrapper">
            <textarea
              value={formData.specialRequests}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
              placeholder="Special requests or dietary requirements..."
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          fullWidth
          icon={<FiCalendar />}
        >
          Confirm Booking
        </Button>
      </form>
    </Card>
  );
};

export default BookingForm;
