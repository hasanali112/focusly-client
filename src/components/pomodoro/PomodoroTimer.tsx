/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setTimeTrack } from "@/redux/features/pomodaro/pomodaroSlice";

type TimerMode = "pomodoro" | "shortBreak" | "mediumBreak" | "longBreak";

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  mediumBreak: number;
  longBreak: number;
}

const PomodoroTimer = () => {
  const { pomodaro, timeTrack } = useAppSelector((state) => state.pomodaro);
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerMode>("pomodoro");
  const [autoStartBreaks, setAutoStartBreaks] = useState<boolean>(true);

  // Timer duration settings (in minutes)
  const timerSettings: TimerSettings = {
    pomodoro: 25,
    shortBreak: 5,
    mediumBreak: 10,
    longBreak: 20,
  };

  // Initialize timer with current mode's time
  useEffect(() => {
    setTimeLeft(timerSettings[timerMode] * 60);
  }, [timerMode]);

  // Parse the startTime format from Redux store
  useEffect(() => {
    if (pomodaro?.startTime) {
      const timePattern = /(\d+)h\s+(\d+)m/;
      const match = pomodaro.startTime.match(timePattern);

      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const totalSeconds = hours * 60 * 60 + minutes * 60;
        setTimeLeft(totalSeconds);
      }
    }
  }, [pomodaro?.startTime]);

  // Handle the timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);

      // Auto-start break if enabled
      if (autoStartBreaks && timerMode === "pomodoro") {
        // Switch to short break
        changeMode("shortBreak");
        setIsActive(true);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, autoStartBreaks, timerMode]);

  const handleTimeTrack = () => {
    let trackData;
    if (isActive) {
      trackData = {
        id: Math.random().toString(36).substring(2, 15),
        date: pomodaro?.date,
        taskName: pomodaro?.taskName,
        pauseTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    } else {
      trackData = {
        id: Math.random().toString(36).substring(2, 15),
        date: pomodaro?.date,
        taskName: pomodaro?.taskName,
        playTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    }

    dispatch(setTimeTrack(trackData));
  };

  // Format the time display as MM:SS
  const formatTime = (): string => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Change timer mode
  const changeMode = (mode: TimerMode): void => {
    setTimerMode(mode);
    setIsActive(false);
    setTimeLeft(timerSettings[mode] * 60);
  };

  // Start or pause the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
    handleTimeTrack();
  };

  // Toggle auto-start breaks
  const toggleAutoStartBreaks = (): void => {
    setAutoStartBreaks(!autoStartBreaks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-5 px-4">
      {/* Header with description */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {pomodaro?.taskName}
      </h1>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-2">
        Date :{" "}
        {new Date(pomodaro.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "2-digit",
        })}
        ;
      </p>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-2">
        Schedule Time :{" "}
        {new Date(
          `1970-01-01T${pomodaro?.scheduleTime || "00:00"}`
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <p className="text-sm text-gray-600 text-center max-w-lg mb-8">
        Finish Time :{" "}
        {new Date(
          `1970-01-01T${pomodaro?.scheduleFinishTime || "00:00"}`
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
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

      {/* Timer mode selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => changeMode("pomodoro")}
          className={`flex items-center px-4 py-2 rounded-full ${
            timerMode === "pomodoro"
              ? "bg-blue-700 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              timerMode === "pomodoro" ? "bg-white" : "border border-gray-400"
            }`}
          ></div>
          Pomodoro
        </button>

        <button
          onClick={() => changeMode("shortBreak")}
          className={`flex items-center px-4 py-2 rounded-full ${
            timerMode === "shortBreak"
              ? "bg-blue-700 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              timerMode === "shortBreak" ? "bg-white" : "border border-gray-400"
            }`}
          ></div>
          Short break (5m)
        </button>

        <button
          onClick={() => changeMode("mediumBreak")}
          className={`flex items-center px-4 py-2 rounded-full ${
            timerMode === "mediumBreak"
              ? "bg-blue-700 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              timerMode === "mediumBreak"
                ? "bg-white"
                : "border border-gray-400"
            }`}
          ></div>
          Medium break (10m)
        </button>

        <button
          onClick={() => changeMode("longBreak")}
          className={`flex items-center px-4 py-2 rounded-full ${
            timerMode === "longBreak"
              ? "bg-blue-700 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              timerMode === "longBreak" ? "bg-white" : "border border-gray-400"
            }`}
          ></div>
          Long break (20m)
        </button>
      </div>

      <div className="bg-blue-200 px-2 py-1 flex justify-start items-center rounded">
        <p className="text-sm text-gray-600 text-center max-w-lg ">
          Working Start Time :{" "}
          {timeTrack.length > 0 ? timeTrack[0]?.playTime : "00:00"}
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
          {isActive ? "Pause" : "Start"}
        </button>
      </div>

      {/* Timer settings */}
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
            <span className="text-gray-700">Auto Pomodoro sequence?</span>
            <button
              onClick={toggleAutoStartBreaks}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                autoStartBreaks ? "bg-blue-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                  autoStartBreaks ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>

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
