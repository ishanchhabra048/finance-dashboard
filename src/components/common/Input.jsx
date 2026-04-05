/**
 * Input — Custom styled form input field.
 * Dark theme, focus border accent, DM Sans font.
 */
import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          bg-bg-elevated border border-bg-border
          rounded-btn px-3.5 py-2.5
          text-sm text-text-primary font-sans
          placeholder:text-text-muted
          focus:outline-none focus:border-accent-primary
          transition-colors duration-150
        "
        {...props}
      />
    </div>
  );
};

export default Input;
