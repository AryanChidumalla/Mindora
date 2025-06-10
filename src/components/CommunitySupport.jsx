import { UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function CommunitySupport() {
  const discussions = [
    {
      title: "Dealing with anxiety at work",
      participants: 12,
      active: true,
    },
    {
      title: "Mindfulness meditation experiences",
      participants: 8,
      active: true,
    },
    {
      title: "Self-care routines sharing",
      participants: 15,
      active: true,
    },
  ];

  return (
    <div className="notion-block">
      <div className="flex items-center gap-3 mb-4">
        <UserGroupIcon className="notion-icon" />
        <h2 className="text-lg font-medium">Community Support</h2>
      </div>
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.title} className="p-4 border border-notion-border rounded-lg hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-notion-gray" />
                <span className="font-medium">{discussion.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-notion-gray">{discussion.participants} participants</span>
                {discussion.active && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
            </div>
          </div>
        ))}
        <button className="notion-button w-full">Join a Discussion</button>
      </div>
    </div>
  );
}