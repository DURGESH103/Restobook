import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { SkeletonCard } from '../ui/Loader';
import './AdminDashboard.css';

const StatCard = ({ title, value, icon, trend, color }) => (
  <Card className="stat-card">
    <div className="stat-icon" style={{ background: `${color}15`, color }}>
      {icon}
    </div>
    <div className="stat-content">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
      {trend && (
        <div className="stat-trend">
          <FiTrendingUp size={14} />
          <span>{trend}% from last month</span>
        </div>
      )}
    </div>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalBookings: 156,
        pendingBookings: 12,
        confirmedBookings: 98,
        totalRevenue: '$12,450'
      });
      setBookings([
        { id: 1, name: 'John Doe', date: '2024-01-15', time: '19:00', guests: 4, status: 'pending' },
        { id: 2, name: 'Jane Smith', date: '2024-01-16', time: '20:00', guests: 2, status: 'confirmed' },
        { id: 3, name: 'Mike Johnson', date: '2024-01-17', time: '18:30', guests: 6, status: 'pending' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="stats-grid">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="admin-dashboard"
    >
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage your restaurant bookings and analytics</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<FiCalendar size={24} />}
          trend={12}
          color="#D4AF37"
        />
        <StatCard
          title="Pending"
          value={stats.pendingBookings}
          icon={<FiClock size={24} />}
          color="#F59E0B"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmedBookings}
          icon={<FiCheckCircle size={24} />}
          trend={8}
          color="#10B981"
        />
        <StatCard
          title="Revenue"
          value={stats.totalRevenue}
          icon={<FiTrendingUp size={24} />}
          trend={15}
          color="#3B82F6"
        />
      </div>

      <Card className="bookings-table-card">
        <div className="table-header">
          <h2 className="table-title">Recent Bookings</h2>
        </div>
        
        <div className="table-responsive">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <td className="customer-cell">
                    <div className="customer-avatar">{booking.name[0]}</div>
                    <span>{booking.name}</span>
                  </td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <div className="guests-badge">
                      <FiUsers size={14} />
                      {booking.guests}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn approve">Approve</button>
                      <button className="action-btn reject">Reject</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};

export default AdminDashboard;
