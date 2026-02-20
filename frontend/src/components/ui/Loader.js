import React from 'react';
import './Loader.css';

export const Spinner = ({ size = 'md' }) => (
  <div className={`spinner spinner-${size}`}></div>
);

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="skeleton-table">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="skeleton-row">
        <div className="skeleton skeleton-cell"></div>
        <div className="skeleton skeleton-cell"></div>
        <div className="skeleton skeleton-cell"></div>
      </div>
    ))}
  </div>
);

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <Spinner size="lg" />
        <p className="loader-text">Loading...</p>
      </div>
    );
  }
  return <Spinner />;
};

export default Loader;
