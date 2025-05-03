import { useState } from "react";
import { Plus } from "lucide-react";
import { useGetAllTasksQuery } from "@/redux/features/task/taskApi";
import { formatDate } from "@/utils/utils";
import { ITask } from "@/types";

import CustomPagination from "../pegination/CustomPegination";
import TaskHeader from "./taskHeader/TaskHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskTable from "./taskTable/TaskTable";

const TaskListUI = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("pending");

  const queryParams = [
    { key: "page", value: currentPage },
    { key: "limit", value: 20 },
    { key: "sort", value: "-status" },
  ];

  if (activeTab) {
    queryParams.push({ key: "status", value: activeTab });
  }

  const {
    data: tasksData,
    isLoading,
    isError,
  } = useGetAllTasksQuery(queryParams);

  // Extract tasks and pagination info from response
  const tasks = tasksData?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <TaskHeader />

      <h3 className="text-lg font-semibold text-gray-800 my-4 mx-4">
        {formatDate(new Date().toISOString())}
      </h3>

      <Tabs
        defaultValue="account"
        className="w-full px-4 pt-4"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-[400px] grid-cols-4 ">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="">All Tasks</TabsTrigger>
        </TabsList>

        <div className=" sm:p-6">
          {/* Task items */}
          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center">
              <p className="text-red-500">
                Error loading tasks. Please try again later.
              </p>
            </div>
          ) : tasks?.length > 0 ? (
            <div className=" grid grid-cols-4 gap-5 mt-4">
              {tasks?.map((task: ITask, index: number) => (
                <TaskTable key={task._id} task={task} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
        </div>
      </Tabs>

      {/* Task list */}

      <div className="pb-5 flex justify-end items-center w-full">
        <CustomPagination
          meta={tasksData?.meta}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Floating action button for mobile */}
      <button className="md:hidden fixed right-4 bottom-20 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TaskListUI;
