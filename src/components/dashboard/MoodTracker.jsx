import { FaceSmileIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const MoodTracker = ({ moodRating, setMoodRating }) => {
  // const [currentMood, setCurrentMood] = useState(3);
  // const [currentMood, setCurrentMood] = useState(7);

  return (
    <div className="border-2 border-primary px-4 py-4 rounded">
      <div className="flex items-center gap-3 mb-4">
        {/* <HeartIcon className="default-icon" /> */}
        <FaceSmileIcon className="default-icon" />
        <h2 className="text-lg font-medium">How is your Mood?</h2>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={moodRating}
        onChange={(e) => setMoodRating(parseInt(e.target.value))}
        className="flex w-full accent-primary"
      />
      <div className="flex justify-between mt-2">
        <span className="notion-text">Not so great</span>
        <span className="notion-text">Amazing</span>
      </div>
    </div>
  );
};
