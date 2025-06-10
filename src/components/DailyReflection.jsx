import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function DailyReflection() {
  const [reflection, setReflection] = useState('');
  const [prompt] = useState(() => {
    const prompts = [
      "What made you smile today?",
      "What's one thing you're grateful for?",
      "How did you take care of yourself today?",
      "What's a challenge you overcame?",
      "What's something you learned about yourself?"
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  });

  return (
    <div className="notion-block">
      <div className="flex items-center gap-3 mb-4">
        <PencilIcon className="notion-icon" />
        <h2 className="text-lg font-medium">Daily Reflection</h2>
      </div>
      <p className="notion-text mb-4">{prompt}</p>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        className="notion-input w-full h-32"
        placeholder="Write your reflection here..."
      />
    </div>
  );
}