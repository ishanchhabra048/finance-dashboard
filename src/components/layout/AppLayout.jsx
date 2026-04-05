/**
 * AppLayout — Main shell: sidebar + header + content area.
 * Desktop: sidebar left, content right.
 * Mobile: bottom nav, full-width content, padding for bottom nav.
 */
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-bg-base">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;
