import React, { memo, useMemo, useCallback } from 'react';
import { StarRating } from './ReviewComponents';

// Memoized menu card to prevent re-renders
export const MenuCard = memo(({ item, onAddToCart }) => {
  const handleAdd = useCallback(() => {
    onAddToCart(item);
  }, [item, onAddToCart]);

  const displayRating = useMemo(() => 
    item.averageRating > 0 ? item.averageRating : item.rating,
    [item.averageRating, item.rating]
  );

  return (
    <div className="card-premium">
      <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={displayRating} readonly size={16} />
          {item.totalReviews > 0 && (
            <span className="text-sm text-gray-500">({item.totalReviews})</span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gold">${item.price}</span>
          <button onClick={handleAdd} className="btn-primary">
            Add to Cart
          </button>
        </div>
        {item.owner?.name && (
          <p className="text-xs text-gray-500 mt-2">Added by: {item.owner.name}</p>
        )}
      </div>
    </div>
  );
});

MenuCard.displayName = 'MenuCard';

// Memoized booking card
export const BookingCard = memo(({ booking, onCancel, onUpdateStatus }) => {
  const statusColors = useMemo(() => ({
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }), []);

  return (
    <div className="card-premium">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold">{booking.name}</p>
          <p className="text-sm text-gray-500">{booking.email}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
          {booking.status}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
        <p>Time: {booking.time}</p>
        <p>Guests: {booking.guests}</p>
      </div>
      {booking.status === 'PENDING' && onCancel && (
        <button onClick={() => onCancel(booking._id)} className="btn-secondary w-full mt-3">
          Cancel
        </button>
      )}
      {onUpdateStatus && booking.status === 'PENDING' && (
        <div className="flex gap-2 mt-3">
          <button onClick={() => onUpdateStatus(booking._id, 'CONFIRMED')} className="btn-primary flex-1">
            Approve
          </button>
          <button onClick={() => onUpdateStatus(booking._id, 'REJECTED')} className="btn-secondary flex-1">
            Reject
          </button>
        </div>
      )}
    </div>
  );
});

BookingCard.displayName = 'BookingCard';
