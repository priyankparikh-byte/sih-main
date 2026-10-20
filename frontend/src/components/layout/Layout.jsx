import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <TopNavbar onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        <main className="flex-1 p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet context={{ isRefreshing, onRefresh: handleRefresh }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
