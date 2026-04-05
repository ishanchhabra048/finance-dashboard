/**
 * Badge — Status/type badges with colored dot and label.
 * Variants: income (amber), expense (red), category (custom color), default (teal).
 */
import React from 'react';

const variantStyles = {
  income: 'bg-accent-income-dim text-accent-income',
  expense: 'bg-accent-expense-dim text-accent-expense',
  default: 'bg-accent-primary-dim text-accent-primary',
};

const Badge = ({ children, variant = 'default', color, className = '' }) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-medium';

  // Custom color badge (for categories)
  if (color) {
    return (
      <span
        className={`${baseClasses} ${className}`}
        style={{ backgroundColor: `${color}18`, color }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        {children}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
