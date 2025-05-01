import { useState } from "react";
import { CheckSquare, Clock, Plus, Edit, Trash } from "lucide-react";
import { useGetAllTasksQuery } from "@/redux/features/task/taskApi";
import { calculateDuration } from "@/utils/utils";
import { ITask } from "@/types";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPomodaro } from "@/redux/features/pomodaro/pomodaroSlice";
import CustomPagination from "../pegination/CustomPegination";
import TaskHeader from "./taskHeader/TaskHeader";

const taskTableData = [
  "Task No.",
  "Task Name",
  "Start - End Time",
  "Duration",
  "Pomodaro Start",
  "Priority",
  "Status",
  "Actions",
];

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  });
};

const TaskListUI = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: tasksData,
    isLoading,
    isError,
  } = useGetAllTasksQuery([
    { key: "page", value: currentPage },
    { key: "limit", value: 20 },
    { key: "sort", value: "createdAt" },
  ]);

  // Extract tasks and pagination info from response
  const tasks = tasksData?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePromoDaro = (startTime: string, start: boolean, task: ITask) => {
    const data = {
      taskName: task.taskName,
      date: task.date,
      scheduleTime: task.startTime,
      scheduleFinishTime: task.endTime,
      startTime: startTime,
      start: start,
    };
    dispatch(setPomodaro(data));
  };

  // Priority colors
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-green-100 text-green-800",
  };

  // Status colors
  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <TaskHeader />

      {/* Task filters - tablet and larger */}
      <div className="hidden md:flex p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            All Tasks
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-sm text-gray-600">
            Daily
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-sm text-gray-600">
            Weekly
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-sm text-gray-600">
            Monthly
          </button>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-sm text-gray-600 flex items-center">
            <Clock size={14} className="mr-1" />
            Due Soon
          </button>
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-sm text-gray-600 flex items-center">
            <CheckSquare size={14} className="mr-1" />
            Completed
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {formatDate(new Date().toISOString())}
        </h3>

        {/* Task table headers */}
        <div className="hidden md:grid grid-cols-8 gap-4 border-b border-gray-200 pb-2">
          {taskTableData.map((header, index) => (
            <div key={index} className="text-sm font-medium text-gray-600">
              {header}
            </div>
          ))}
        </div>

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
          <div className="space-y-3 mt-4">
            {tasks?.map((task: ITask, index: number) => (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Desktop view */}
                <div className="hidden md:grid grid-cols-8 gap-4 items-center">
                  <div className="text-sm text-gray-600">{index + 1}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {task.taskName}
                  </div>
                  {/* startime and endtime */}
                  <div className="text-sm text-gray-600">
                    {formatTime(task.startTime)} - {formatTime(task.endTime)}
                  </div>
                  {/* duration */}
                  <div className="text-sm text-gray-600">
                    {calculateDuration(task.startTime, task.endTime)}
                  </div>
                  {/* pomodoro */}
                  <div className="text-sm text-gray-600">
                    {task.pomodoro ? (
                      <span className="flex items-center text-green-500">
                        <CheckSquare size={14} className="mr-1" />
                        Started
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-500">
                        <Clock size={14} className="mr-1" />
                        Not Started
                      </span>
                    )}
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                        priorityColors[
                          task.priority as keyof typeof priorityColors
                        ]
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                        statusColors[task.status as keyof typeof statusColors]
                      }`}
                    >
                      {task.status
                        .split("-")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                      <Trash size={16} />
                    </button>
                    <Button
                      onClick={() =>
                        handlePromoDaro(
                          calculateDuration(task.startTime, task.endTime),
                          true,
                          task
                        )
                      }
                      className="w-[50px] h-[25px] rounded text-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Start
                    </Button>
                  </div>
                </div>

                {/* Mobile view */}
                <div className="md:hidden space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">
                      {task.taskName}
                    </h4>
                    <span
                      className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                        statusColors[task.status as keyof typeof statusColors]
                      }`}
                    >
                      {task.status
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-1" />
                    {formatTime(task.startTime)} - {formatTime(task.endTime)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(task.date).split(",")[0]} •{" "}
                    {calculateDuration(task.startTime, task.endTime)} •{" "}
                    {task.pomodoro
                      ? "Pomodoro Started"
                      : "Pomodoro Not Started"}
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                        priorityColors[
                          task.priority as keyof typeof priorityColors
                        ]
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </div>
                  <div className="">
                    <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                      <Trash size={16} />
                    </button>
                  </div>
                  <Button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
      <div className="pb-5 flex justify-end items-center w-full">
        <CustomPagination
          meta={tasksData.meta}
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
