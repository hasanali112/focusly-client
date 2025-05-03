import { Filter } from "lucide-react";
import TaskForm from "../TaskForm";

const TaskHeader = () => {
  return (
    <div>
      <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white">
        <div>
          <h2 className="text-xl font-semibold">Task Manager</h2>
          <p className="text-indigo-100 text-sm mt-1 hidden sm:block">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-3 pr-10 py-2 text-sm bg-white bg-opacity-20 rounded-md placeholder-indigo-200 text-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-indigo-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <button
            className="p-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Filter tasks"
          >
            <Filter size={18} />
          </button>

          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
