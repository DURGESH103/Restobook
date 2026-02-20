import React, { useState } from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  icon,
  required = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-wrapper">
      <div className={`input-container ${isFocused || value ? 'focused' : ''} ${error ? 'error' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
          placeholder=" "
          {...props}
        />
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
