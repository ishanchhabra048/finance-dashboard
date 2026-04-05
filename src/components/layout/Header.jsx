/**
 * Header — Top bar with page title and role switcher toggle.
 * Role switcher: segmented control pill with Viewer (Eye) and Admin (ShieldCheck).
 */
import React from 'react';
import { Eye, ShieldCheck } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';

const Header = () => {
  const { state, dispatch } = useAppState();
  const { role } = state;

  const handleRoleSwitch = (newRole) => {
    dispatch({ type: 'SET_ROLE', payload: newRole });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-8 bg-bg-surface/80 backdrop-blur-md border-b border-bg-border">
      {/* Mobile brand */}
      <div className="flex items-center gap-3 lg:hidden">
        <div className="w-7 h-7 rounded-lg bg-accent-primary flex items-center justify-center">
          <span className="text-bg-base font-bold text-xs">₹</span>
        </div>
        <span className="font-semibold text-base text-text-primary">FinDash</span>
      </div>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* Role Switcher — Segmented Control */}
      <div className="flex items-center gap-1 bg-bg-base rounded-full p-1 border border-bg-border">
        <button
          onClick={() => handleRoleSwitch('viewer')}
          className={`
            flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
            transition-all duration-200 cursor-pointer
            ${
              role === 'viewer'
                ? 'bg-bg-elevated text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            }
          `}
          aria-label="Switch to Viewer mode"
        >
          <Eye size={14} strokeWidth={1.5} />
          <span className="hidden sm:inline">Viewer</span>
        </button>
        <button
          onClick={() => handleRoleSwitch('admin')}
          className={`
            flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
            transition-all duration-200 cursor-pointer
            ${
              role === 'admin'
                ? 'bg-accent-primary text-bg-base shadow-sm shadow-accent-primary/20'
                : 'text-text-muted hover:text-text-secondary'
            }
          `}
          aria-label="Switch to Admin mode"
        >
          <ShieldCheck size={14} strokeWidth={1.5} />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
