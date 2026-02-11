import React, { useState, useEffect, useRef } from 'react';

/**
 * Timer component for role-play sessions
 * Allows users to set a custom duration and countdown
 * Displays as a sticky floating widget in the bottom-right corner
 */
const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSetup, setIsSetup] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes default
  const [isExpanded, setIsExpanded] = useState(false); // Toggle for showing/hiding timer
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Play a sound or show notification when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);

  const handleStart = () => {
    if (isSetup) {
      setIsSetup(false);
      setTotalSeconds(minutes * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSetup(true);
    setMinutes(5);
    setTotalSeconds(300);
  };

  const handleMinutesChange = (value) => {
    const newMinutes = Math.max(1, Math.min(60, parseInt(value) || 1));
    setMinutes(newMinutes);
  };

  const getTimerColor = () => {
    const percentage = (totalSeconds / (minutes * 60)) * 100;
    if (percentage > 50) return 'from-green-500 to-emerald-600';
    if (percentage > 25) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button - Always Visible */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 ${
            isRunning
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600'
          }`}
          title="Open Timer"
        >
          ⏱️
        </button>
      )}

      {/* Expanded Timer Widget */}
      {isExpanded && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 w-80 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <span className="text-xl mr-2">⏱️</span>
              Timer
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none transition-colors"
              title="Minimize Timer"
            >
              ×
            </button>
          </div>

          {/* Timer Content */}
          <div className="p-4">
            {isSetup ? (
              /* Setup Mode */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={minutes}
                    onChange={(e) => handleMinutesChange(e.target.value)}
                    className="w-full px-4 py-2 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Start Timer
                </button>
              </div>
            ) : (
              /* Timer Display */
              <div className="space-y-4">
                <div className={`text-5xl font-bold bg-gradient-to-r ${getTimerColor()} bg-clip-text text-transparent text-center`}>
                  {formatTime(minutes, seconds)}
                </div>

                {totalSeconds === 0 && (
                  <div className="text-xl animate-bounce text-center">
                    ⏰ Time's Up!
                  </div>
                )}

                <div className="flex space-x-2">
                  {!isRunning && totalSeconds > 0 ? (
                    <button
                      onClick={handleStart}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      ▶️ Resume
                    </button>
                  ) : totalSeconds > 0 ? (
                    <button
                      onClick={handlePause}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      ⏸️ Pause
                    </button>
                  ) : null}
                  
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    🔄 Reset
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getTimerColor()} transition-all duration-1000 ease-linear`}
                    style={{ width: `${(totalSeconds / (minutes * 60 + seconds)) * 100}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {totalSeconds > 0 ? `${totalSeconds} seconds remaining` : 'Session complete'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;