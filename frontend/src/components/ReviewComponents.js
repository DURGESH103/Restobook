import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const StarRating = ({ rating, onRate, readonly = false, size = 24 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => !readonly && onRate(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <FiStar
            size={size}
            className={`transition-colors ${
              star <= (hover || rating)
                ? 'fill-gold text-gold'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};

export const ReviewForm = ({ menuItemId, onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment.trim().length >= 10) {
      onSubmit({ menuItemId, rating, comment: comment.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <StarRating rating={rating} onRate={setRating} size={32} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience (min 10 characters)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold dark:bg-gray-800"
          rows={4}
          minLength={10}
          maxLength={500}
          required
        />
        <p className="text-xs text-gray-500 mt-1">{comment.length}/500</p>
      </div>
      <button
        type="submit"
        disabled={loading || !rating || comment.trim().length < 10}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export const ReviewList = ({ reviews, currentUserId, onReply, isAdmin }) => {
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState('');

  const handleReply = (reviewId) => {
    if (reply.trim().length >= 5) {
      onReply(reviewId, reply.trim());
      setReplyTo(null);
      setReply('');
    }
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-lg p-4 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">{review.user?.name}</p>
              <StarRating rating={review.rating} readonly size={16} />
            </div>
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
          
          {review.adminReply && (
            <div className="mt-3 pl-4 border-l-2 border-gold bg-gold/5 p-3 rounded">
              <p className="text-sm font-medium text-gold mb-1">
                {review.repliedBy?.name} replied:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{review.adminReply}</p>
            </div>
          )}

          {isAdmin && !review.adminReply && (
            <div className="mt-3">
              {replyTo === review._id ? (
                <div className="space-y-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write your reply (min 5 characters)"
                    className="w-full px-3 py-2 border rounded text-sm dark:bg-gray-800"
                    rows={2}
                    minLength={5}
                    maxLength={500}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReply(review._id)}
                      disabled={reply.trim().length < 5}
                      className="btn-primary text-sm px-3 py-1 disabled:opacity-50"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => { setReplyTo(null); setReply(''); }}
                      className="btn-secondary text-sm px-3 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setReplyTo(review._id)}
                  className="text-sm text-gold hover:underline"
                >
                  Reply
                </button>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
