import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return { label: 'Pending', className: 'status-pending' };
      case 'confirmed':
        return { label: 'Confirmed', className: 'status-confirmed' };
      case 'rejected':
        return { label: 'Rejected', className: 'status-rejected' };
      case 'cancelled':
        return { label: 'Cancelled', className: 'status-cancelled' };
      default:
        return { label: status, className: 'status-default' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-dot"></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
