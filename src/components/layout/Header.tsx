import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/tasks') return 'Tasks';
    if (path === '/pomodoro') return 'Pomodoro Timer';
    if (path === '/planner') return 'Daily Planner';
    if (path === '/expenses') return 'Expense Tracker';
    if (path === '/projects') return 'Projects';
    if (path === '/ideas') return 'Ideas';
    if (path === '/settings') return 'Settings';
    
    return 'ProductivityHub';
  };
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:inline-block">User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;