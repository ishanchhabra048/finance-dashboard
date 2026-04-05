/**
 * Sidebar — Desktop navigation sidebar (240px width).
 * Active state: left border accent, dim bg, white text.
 * Items: icon + label, 44px height.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, TrendingUp } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: TrendingUp },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] min-h-screen bg-bg-surface border-r border-bg-border">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-bg-border">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
          <span className="text-bg-base font-bold text-sm">₹</span>
        </div>
        <span className="font-semibold text-lg text-text-primary">FinDash</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? 'bg-accent-primary-dim text-text-primary border-l-[3px] border-accent-primary'
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary border-l-[3px] border-transparent'
              }`
            }
          >
            <item.icon size={20} strokeWidth={1.5} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-bg-border">
        <p className="text-xs text-text-muted">Finance Dashboard v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
