/**
 * Card — Base card wrapper with optional accent top border.
 * Matches design spec: surface bg, border, shadow, hover lift.
 */
import React from 'react';

const Card = ({ children, className = '', accent, animate = false, stagger = 0 }) => {
  return (
    <div
      className={`
        rounded-card border border-bg-border
        bg-bg-surface p-6
        shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-200 ease-in-out
        ${animate ? `animate-card stagger-${stagger}` : ''}
        ${className}
      `}
      style={accent ? { borderTopColor: accent, borderTopWidth: '2px' } : {}}
    >
      {children}
    </div>
  );
};

export default Card;
