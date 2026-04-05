/**
 * Button — Primary, ghost, and danger variants.
 * Follows design system border-radius and hover effects.
 */
import React from 'react';

const variants = {
  primary:
    'bg-accent-primary text-bg-base font-semibold hover:brightness-110 shadow-lg shadow-accent-primary/20',
  ghost:
    'bg-transparent border border-bg-border text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
  danger:
    'bg-accent-expense/10 text-accent-expense border border-accent-expense/20 hover:bg-accent-expense/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-btn font-medium
        transition-all duration-150 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={1.5} />}
      {children}
    </button>
  );
};

export default Button;
