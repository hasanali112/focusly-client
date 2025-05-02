/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/redux/hook";
import { resetPromo } from "@/redux/features/pomodaro/pomodaroSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateStartAndEndTimeMutation } from "@/redux/features/task/taskApi";

const TIMER_STORAGE_KEY = "pomodoro_timer_state";

const PomodoroTimer = () => {
  const { pomodaro } = useAppSelector((state) => state.pomodaro);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [updateStartAndEndTime] = useUpdateStartAndEndTimeMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Create a unique task identifier using taskName and date
  const getTaskKey = () => {
    return pomodaro?.taskName && pomodaro?.date
      ? `${pomodaro.taskName}_${pomodaro.date}`
      : null;
  };

  // Parse time from startTime format (e.g., "0h 10m")
  const parseStartTime = () => {
    if (!pomodaro?.startTime) return 0;

    const timePattern = /(\d+)h\s+(\d+)m/;
    const match = pomodaro.startTime.match(timePattern);

    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      return hours * 60 * 60 + minutes * 60; // Convert to seconds
    }

    return 0;
  };

  useEffect(() => {
    if (initialized) return;

    const taskKey = getTaskKey();
    const initialDuration = parseStartTime();

    if (taskKey) {
      const savedState = localStorage.getItem(TIMER_STORAGE_KEY);

      if (savedState) {
        try {
          const {
            taskKey: savedTaskKey,
            timeLeft: savedTimeLeft,
            isActive: savedIsActive,
            pausedTime: savedPausedTime,
          } = JSON.parse(savedState);

          if (savedTaskKey === taskKey) {
            if (savedTimeLeft && savedTimeLeft > 0) {
              setTimeLeft(savedTimeLeft);
              setIsActive(savedIsActive);
              setPausedTime(savedPausedTime);

              setInitialized(true);
              return;
            }
          }
        } catch (error) {
          console.error("Error restoring timer state:", error);
        }
      }
    }

    if (initialDuration > 0) {
      setTimeLeft(initialDuration);

      if (pomodaro?.start) {
        setIsActive(true);
      }
    }

    setInitialized(true);
  }, [pomodaro]); // Re-run if pomodaro changes

  // Handle timer countdown
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      if (timeLeft === parseStartTime()) {
        const timeStart = new Date().toISOString();
        const payload = {
          workStartTime: timeStart,
        };
        updateStartAndEndTime({ id: pomodaro?.id, payload });
      }

      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const timeStart = new Date().toISOString();

      const payload = {
        workEndTime: timeStart,
      };
      updateStartAndEndTime({ id: pomodaro?.id, payload });
      dispatch(resetPromo());
      Swal.fire({
        title: "Congratulations!",
        text: "You have completed your task!",
        icon: "success",
      });
      navigate("/tasks");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    if (!initialized) return;

    const taskKey = getTaskKey();

    if (taskKey) {
      const stateToSave = {
        taskKey,
        timeLeft,
        isActive,
        pausedTime,
      };

      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [timeLeft, isActive, pausedTime, initialized]);

  // Toggle timer between play and pause
  const toggleTimer = () => {
    // If timer is at 0, reset it to initial duration before starting
    if (timeLeft === 0 && !isActive) {
      const initialDuration = parseStartTime();
      if (initialDuration > 0) {
        setTimeLeft(initialDuration);
      }
    }

    if (isActive) {
      setIsActive(false);
      setPausedTime(timeLeft);
    } else {
      setIsActive(true);
      setPausedTime(null);
    }
  };

  // Format time for display (MM:SS)
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-5 px-4">
      {/* Header with description */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {pomodaro?.taskName || "Pomodoro Timer"}
      </h1>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-2">
        Date :{" "}
        {pomodaro?.date
          ? new Date(pomodaro.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "2-digit",
            })
          : "-"}
      </p>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-2">
        Schedule Time :{" "}
        {pomodaro?.scheduleTime
          ? new Date(
              `1970-01-01T${pomodaro.scheduleTime || "00:00"}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "-"}
      </p>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-8">
        Finish Time :{" "}
        {pomodaro?.scheduleFinishTime
          ? new Date(
              `1970-01-01T${pomodaro.scheduleFinishTime || "00:00"}`
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "-"}
      </p>

      {/* Pattern background */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-10">
        <div
          className="absolute top-0 right-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='3' fill='%239C92AC' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Pomodoro mode button */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button className="flex items-center px-4 py-2 rounded-full bg-blue-700 text-white">
          <div className="w-4 h-4 rounded-full mr-2 bg-white"></div>
          Pomodoro
        </button>
      </div>

      <div className="bg-blue-200 px-2 py-1 flex justify-start items-center rounded mb-6">
        <p className="text-sm text-gray-600 text-center max-w-lg ">
          Working Start Time :{" "}
          {/* {timeTrack.length > 0 && timeTrack[0]?.playTime
            ? timeTrack[0]?.playTime
            : "Not started"} */}
        </p>
      </div>

      {/* Timer display */}
      <div className="mb-6">
        <h2 className="text-9xl font-bold text-gray-800">{formatTime()}</h2>
      </div>

      {/* Timer controls */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={toggleTimer}
          className="px-6 py-3 bg-blue-700 text-white font-medium rounded hover:bg-green-600 transition-colors w-32"
        >
          {isActive ? "Pause" : timeLeft > 0 ? "Resume" : "Start"}
        </button>
      </div>

      {/* Timer info */}
      <div className="w-full max-w-2xl">
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Pomodoro objective: Finish your urgent task in 1 hour</p>
          <div className="flex items-center justify-center mt-1">
            <div className="h-2 w-2 rounded-full bg-blue-700 mr-1"></div>
            <span>
              Number of completed Pomodoro's:{" "}
              <span className="font-semibold">0</span> out of{" "}
              <span className="font-semibold">4</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
