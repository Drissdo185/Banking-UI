import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User } from '../../types';

interface LayoutProps {
  user: User;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen w-screen bg-white overflow-hidden">
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden"
          onClick={handleCloseSidebar}
        />
      )}
      
      <main className="flex-1 p-12 bg-gray-50 overflow-y-auto w-full md:w-[calc(100vw-240px)] md:pt-12 pt-20 md:pl-12 pl-6">
        <Header onMenuToggle={handleMenuToggle} />
        {children}
      </main>
    </div>
  );
};