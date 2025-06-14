import { HeartIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const SleepTracker = ({ sleepRating, setSleepRating }) => {
  // const [sleepRating, setSleepRating] = useState(3);

  return (
    <div className="border-2 border-primary px-4 py-4 rounded">
      <div className="flex items-center gap-3 mb-4">
        <MoonIcon className="default-icon" />
        <h2 className="text-lg font-medium">Did you Sleep well?</h2>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={sleepRating}
        onChange={(e) => setSleepRating(parseInt(e.target.value))}
        className="flex w-full accent-primary"
      />
      <div className="flex justify-between mt-2">
        <span className="notion-text">Not so great</span>
        <span className="notion-text">Amazing</span>
      </div>
    </div>
  );
};
