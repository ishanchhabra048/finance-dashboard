/**
 * EmptyState — Friendly empty data UI with optional CTA button.
 * Shows SVG illustration, message text, and action button for admin.
 */
import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ message = 'No data to display', actionLabel, onAction, showAction = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 animate-fade-in">
      {/* Simple SVG no-data illustration */}
      <div className="w-20 h-20 rounded-full bg-bg-elevated flex items-center justify-center mb-6">
        <Inbox size={36} className="text-text-muted" strokeWidth={1.5} />
      </div>

      <h3 className="text-lg font-medium text-text-primary mb-2">
        Nothing here yet
      </h3>
      <p className="text-sm text-text-secondary text-center max-w-xs mb-6">
        {message}
      </p>

      {showAction && actionLabel && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
