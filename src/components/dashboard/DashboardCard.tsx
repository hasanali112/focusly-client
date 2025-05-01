import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <div className="text-indigo-600">{icon}</div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;