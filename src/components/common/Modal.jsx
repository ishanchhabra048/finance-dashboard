/**
 * Modal — Dialog overlay wrapper for Add/Edit transaction forms.
 * Backdrop with blur, centered card, escape key to close.
 */
import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
        onClick={onClose}
      />
      {/* Modal Card */}
      <div
        className="
          relative z-10 w-full max-w-lg mx-4
          bg-bg-elevated rounded-2xl p-8
          border border-bg-border
          shadow-[0_24px_64px_rgba(0,0,0,0.5)]
          animate-fade-in-up
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-surface transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        {/* Body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
