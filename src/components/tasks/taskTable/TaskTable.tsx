import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setPomodaro } from "@/redux/features/pomodaro/pomodaroSlice";
import { useUpdateTaskMutation } from "@/redux/features/task/taskApi";
import { useAppDispatch } from "@/redux/hook";
import { ITask } from "@/types";
import { calculateDuration, formatDate } from "@/utils/utils";
import { CheckSquare, Clock, Edit, Loader, Trash } from "lucide-react";
import { useState } from "react";

const TaskTable = ({ task, index }: { task: ITask; index: number }) => {
  const dispatch = useAppDispatch();
  const { pomodaro } = useAppSelector((state) => state.pomodaro);
  const [loading, setLoading] = useState("");
  const [updateTask] = useUpdateTaskMutation();

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
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

  const handleUpdateTask = (id: string) => {
    updateTask(id);
    setLoading(id);
  };

  return (
    <div>
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
                priorityColors[task.priority as keyof typeof priorityColors]
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          <div>
            {(task?.status === "inProgress" && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-1">
                In Progress
              </span>
            )) ||
              (task.status === "pending" && (
                <span className="bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-1">
                  Pending
                </span>
              )) ||
              (task?.status === "completed" && (
                <span className="bg-green-100 text-green-800 text-xs font-medium rounded-full px-2 py-1">
                  Completed
                </span>
              ))}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
              <Edit size={16} />
            </button>
            <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
              <Trash size={16} />
            </button>
            <Button
              onClick={() => {
                handlePromoDaro(
                  calculateDuration(task.startTime, task.endTime),
                  true,
                  task
                );
                handleUpdateTask(task._id);
              }}
              disabled={
                task.status === "inProgress" ||
                task.status === "completed" ||
                pomodaro.taskName !== null
              }
              className="w-[50px] h-[25px] rounded text-sm text-white bg-green-600 hover:bg-green-700"
            >
              {loading === task._id ? (
                <Loader className="animate-spin" />
              ) : (
                "Start"
              )}
            </Button>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900">{task.taskName}</h4>
            <span
              className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                statusColors[task.status as keyof typeof statusColors]
              }`}
            >
              {task.status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
            {task.pomodoro ? "Pomodoro Started" : "Pomodoro Not Started"}
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                priorityColors[task.priority as keyof typeof priorityColors]
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
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
    </div>
  );
};

export default TaskTable;
