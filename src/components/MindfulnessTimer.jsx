import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { ClockIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

export default function MindfulnessTimer() {
  const [duration, setDuration] = useState(5); // minutes
  const time = new Date();
  time.setMinutes(time.getMinutes() + duration);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp: time, autoStart: false });

  const handleRestart = () => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + duration);
    restart(time);
  };

  return (
    <div className="notion-block">
      <div className="flex items-center gap-3 mb-4">
        <ClockIcon className="notion-icon" />
        <h2 className="text-lg font-medium">Mindfulness Timer</h2>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex gap-4">
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="notion-input"
          >
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
          </select>
          <button
            onClick={isRunning ? pause : start}
            className="notion-button-primary flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <PauseIcon className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                Start
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}