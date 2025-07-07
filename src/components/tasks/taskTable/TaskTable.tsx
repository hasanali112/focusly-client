import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setPomodaro } from "@/redux/features/pomodaro/pomodaroSlice";
import { useUpdateTaskMutation } from "@/redux/features/task/taskApi";
import { useAppDispatch } from "@/redux/hook";
import { ITask } from "@/types";
import { calculateDuration, formatDate } from "@/utils/utils";
import { Clock, Edit, Loader, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskTable = ({ task, index }: { task: ITask; index: number }) => {
  const dispatch = useAppDispatch();
  const { pomodaro } = useAppSelector((state) => state.pomodaro);
  const [loading, setLoading] = useState("");
  const [updateTask] = useUpdateTaskMutation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (pomodaro.id === task._id) {
      const savedState = localStorage.getItem("pomodoro_timer_state");
      if (savedState) {
        try {
          const { timeLeft: savedTimeLeft } = JSON.parse(savedState);
          if (savedTimeLeft && savedTimeLeft > 0) {
            setTimeLeft(savedTimeLeft);
          }
        } catch (error) {
          console.error("Error restoring timer state:", error);
        }
      }
    }
  }, [pomodaro, task._id]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pomodaro.id === task._id) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            dispatch(resetPromo());
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodaro, task._id, dispatch]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTimeForDisplay = (localTime: string) => {
    if (!localTime) return "";

    try {
      const timePart = localTime.split("T")[1].substring(0, 5);
      const [hours, minutes] = timePart.split(":").map(Number);

      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;

      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return localTime;
    }
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-green-100 text-green-800",
  };

  const handlePromoDaro = (startTime: string, start: boolean, task: ITask) => {
    const data = {
      id: task._id,
      taskName: task.title,
      date: task.date,
      scheduleTime: task.startTime.split("T")[1],
      scheduleFinishTime: task.endTime.split("T")[1],
      startTime: startTime,
      start: start,
    };
    dispatch(setPomodaro(data));
  };

  const handleUpdateTask = (id: string) => {
    updateTask(id);
    setLoading(id);
    navigate("/pomodoro");
  };

  return (
    <div
      onClick={() => {
        if (pomodaro.id === task._id) {
          navigate("/pomodoro");
        }
      }}
      className={pomodaro.id === task._id ? "cursor-pointer" : ""}
    >
      <div
        key={task._id}
        className="bg-gradient-to-t from-purple-50 to-pink-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full"
      >
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
            <h4 className="font-medium text-gray-900">
              {index + 1}. {task.title}
            </h4>
            <span
              className={`text-xs font-medium rounded-full px-2 py-1 ${
                task.status === "inProgress"
                  ? "bg-blue-100 text-blue-800"
                  : task.status === "pending"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1" />
            {formatTimeForDisplay(task.startTime)} -{" "}
            {formatTimeForDisplay(task.endTime)}
          </div>

          <div className="text-xs text-gray-500">
            {formatDate(task.date).split(",")[0]} •{" "}
            {calculateDuration(task.startTime, task.endTime)} •{" "}
            {pomodaro.id === task._id ? (
              <span className="font-semibold text-green-600">
                Pomodoro Started: {formatTime(timeLeft)}
              </span>
            ) : (
              "Pomodoro Not Started"
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <span
              className={`inline-flex px-2 py-1 leading-none text-xs font-medium rounded-full ${
                priorityColors[task.priority as keyof typeof priorityColors]
              }`}
            >
              {task.priority}
            </span>

            <div className="flex gap-2">
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
                className="w-[60px] h-[28px] rounded text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {loading === task._id ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  "Start"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
