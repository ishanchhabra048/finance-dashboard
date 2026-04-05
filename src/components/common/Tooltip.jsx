/**
 * Tooltip — Simple hover tooltip.
 * Shows on hover with a small delay.
 */
import React, { useState } from 'react';

const Tooltip = ({ children, text, className = '' }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-bg-border text-xs text-text-primary whitespace-nowrap z-50 shadow-lg animate-fade-in pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-bg-elevated border-r border-b border-bg-border rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
