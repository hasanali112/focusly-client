import React from 'react';
import { Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Settings</h2>
      </div>
      
      <div className="p-6">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    defaultValue="User"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    defaultValue="user@example.com"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Pomodoro Settings</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="pomodoro-duration" className="block text-sm font-medium text-gray-700">
                      Pomodoro Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="pomodoro-duration"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      defaultValue="25"
                      min="1"
                      max="60"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="short-break" className="block text-sm font-medium text-gray-700">
                      Short Break (minutes)
                    </label>
                    <input
                      type="number"
                      id="short-break"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      defaultValue="5"
                      min="1"
                      max="30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="long-break" className="block text-sm font-medium text-gray-700">
                      Long Break (minutes)
                    </label>
                    <input
                      type="number"
                      id="long-break"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      defaultValue="15"
                      min="1"
                      max="60"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      id="auto-start-breaks"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-start-breaks" className="ml-2 block text-sm text-gray-700">
                      Auto-start breaks
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      id="auto-start-pomodoros"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-start-pomodoros" className="ml-2 block text-sm text-gray-700">
                      Auto-start pomodoros
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <input
                      id="enable-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="enable-notifications" className="ml-2 block text-sm text-gray-700">
                      Enable notifications
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      id="sound-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="sound-notifications" className="ml-2 block text-sm text-gray-700">
                      Sound notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save size={16} className="mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;