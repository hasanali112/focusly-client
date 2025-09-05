/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/redux/hook";
import { resetPromo } from "@/redux/features/pomodaro/pomodaroSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateStartAndEndTimeMutation, useUpdateTaskMutation } from "@/redux/features/task/taskApi";

const TIMER_STORAGE_KEY = "pomodoro_timer_state";

const PomodoroTimer = () => {
  const { pomodaro } = useAppSelector((state) => state.pomodaro);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [updateStartAndEndTime] = useUpdateStartAndEndTimeMutation();
  const [updateTask] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);

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
            hasStarted: savedHasStarted,
          } = JSON.parse(savedState);

          if (savedTaskKey === taskKey) {
            if (savedTimeLeft && savedTimeLeft > 0) {
              setTimeLeft(savedTimeLeft);
              setIsActive(savedIsActive);
              setPausedTime(savedPausedTime);
              hasStartedRef.current = savedHasStarted;

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

  useEffect(() => {
    if (isActive) {
      document.title = `${formatTime()} - ${pomodaro?.taskName || "Pomodoro"}`;
    } else {
      document.title = "EfficiZen"; // Reset title when timer is not active
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "EfficiZen";
    };
  }, [isActive, timeLeft, pomodaro?.taskName]);

  // Handle timer countdown
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      if (!hasStartedRef.current) {
        const timeStart = new Date().toISOString();
        const payload = {
          workStartTime: timeStart,
        };
        updateStartAndEndTime({ id: pomodaro?.id, payload });
        hasStartedRef.current = true;
      }

      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const timeEnd = new Date().toISOString();

      const payload = {
        workEndTime: timeEnd,
      };
      updateStartAndEndTime({ id: pomodaro?.id, payload });
      
      // Update task status to complete
      updateTask({ id: pomodaro?.id, payload: { status: "complete" } });
      
      dispatch(resetPromo());
      Swal.fire({
        title: "Congratulations!",
        text: "You have completed your task!",
        icon: "success",
      });
      navigate("/tasks");
      hasStartedRef.current = false; // Reset for the next run
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
        hasStarted: hasStartedRef.current, // Save the hasStarted state
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {pomodaro?.taskName || "Pomodoro Timer"}
          </h1>
          <p className="text-sm text-gray-600">
            Date:{" "}
            {pomodaro?.date
              ? new Date(pomodaro.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : "-"}
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center mb-4 sm:mb-8">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-8 border-gray-200 flex items-center justify-center">
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-800">
              {formatTime()}
            </h2>
          </div>
        </div>

        <div className="flex justify-center mb-4 sm:mb-8">
          <button
            onClick={toggleTimer}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors w-40"
          >
            {isActive ? "Pause" : timeLeft > 0 ? "Resume" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
