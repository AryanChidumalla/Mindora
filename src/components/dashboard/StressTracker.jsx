import { FaceFrownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const StressTracker = ({ stressRating, setStressRating }) => {
  // const [currentStress, setCurrentStress] = useState(3);

  return (
    <div className="border-2 border-primary px-4 py-4 rounded">
      <div className="flex items-center gap-3 mb-4">
        {/* <HeartIcon className="default-icon" /> */}
        <FaceFrownIcon className="default-icon" />
        <h2 className="text-lg font-medium">Are you feeling Stressed?</h2>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={stressRating}
        onChange={(e) => setStressRating(parseInt(e.target.value))}
        className="flex w-full accent-primary"
      />
      <div className="flex justify-between mt-2">
        <span className="notion-text">Yes</span>
        <span className="notion-text">No</span>
      </div>
    </div>
  );
};
