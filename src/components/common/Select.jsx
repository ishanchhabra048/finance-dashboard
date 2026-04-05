/**
 * Select — Custom styled dropdown select.
 * Dark theme matching Input component styling.
 */
import React from 'react';

const Select = ({
  label,
  value,
  onChange,
  options = [],
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="
          bg-bg-elevated border border-bg-border
          rounded-btn px-3.5 py-2.5
          text-sm text-text-primary font-sans
          focus:outline-none focus:border-accent-primary
          transition-colors duration-150
          cursor-pointer appearance-none
          bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%238892A4%22%20d%3d%22M2%204l4%204%204-4%22/%3e%3c/svg%3e')]
          bg-no-repeat bg-[position:right_12px_center]
          pr-10
        "
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
