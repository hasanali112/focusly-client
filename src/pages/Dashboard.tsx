import React from 'react';
import { 
  CheckSquare, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Lightbulb 
} from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import TaskSummary from '../components/dashboard/TaskSummary';
import ExpenseSummary from '../components/dashboard/ExpenseSummary';
import ProjectSummary from '../components/dashboard/ProjectSummary';
import IdeaSummary from '../components/dashboard/IdeaSummary';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to ProductivityHub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Tasks" 
          icon={<CheckSquare size={20} />}
        >
          <TaskSummary />
        </DashboardCard>
        
        <DashboardCard 
          title="Expenses" 
          icon={<DollarSign size={20} />}
        >
          <ExpenseSummary />
        </DashboardCard>
        
        <DashboardCard 
          title="Projects" 
          icon={<Briefcase size={20} />}
        >
          <ProjectSummary />
        </DashboardCard>
        
        <DashboardCard 
          title="Ideas" 
          icon={<Lightbulb size={20} />}
        >
          <IdeaSummary />
        </DashboardCard>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Start</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <CheckSquare size={24} className="text-indigo-600" />
            </div>
            <h3 className="font-medium text-indigo-800 mb-1">Manage Tasks</h3>
            <p className="text-sm text-indigo-600">Create and organize tasks with Pomodoro tracking</p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={24} className="text-red-600" />
            </div>
            <h3 className="font-medium text-red-800 mb-1">Focus with Pomodoro</h3>
            <p className="text-sm text-red-600">Use the Pomodoro technique to boost productivity</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <h3 className="font-medium text-green-800 mb-1">Track Expenses</h3>
            <p className="text-sm text-green-600">Monitor your spending and stay within budget</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <Lightbulb size={24} className="text-yellow-600" />
            </div>
            <h3 className="font-medium text-yellow-800 mb-1">Capture Ideas</h3>
            <p className="text-sm text-yellow-600">Never lose a brilliant idea again</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;