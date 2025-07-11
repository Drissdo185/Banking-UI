import React from 'react';
import { Button, Icon } from '../ui';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <button 
        onClick={onMenuToggle}
        className="hidden md:hidden fixed top-5 left-5 z-[1001] bg-white border border-gray-200 rounded-lg p-4 cursor-pointer text-gray-500"
      >
        <Icon name="fas fa-bars" />
      </button>
      
      <header className="flex justify-between items-center mb-12 md:mt-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">My Card</h1>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <span>Dashboard</span>
            <Icon name="fas fa-chevron-right" size="sm" />
            <span>My Card</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            className="bg-secondary-orange hover:bg-secondary-orangeLight hover:-translate-y-px"
          >
            <Icon name="fas fa-plus" />
            Add Card
          </Button>
          
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-500 text-sm cursor-pointer">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
            </span>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-500"
            >
              <Icon name="fas fa-sign-out-alt" size="sm" />
              Logout
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};