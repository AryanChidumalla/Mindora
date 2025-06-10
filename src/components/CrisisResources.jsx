import { PhoneIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function CrisisResources() {
  const resources = [
    {
      name: "National Crisis Hotline",
      phone: "988",
      available: "24/7",
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      available: "24/7",
    },
    {
      name: "Trevor Project (LGBTQ+)",
      phone: "1-866-488-7386",
      available: "24/7",
    },
  ];

  return (
    <div className="notion-block bg-red-50">
      <div className="flex items-center gap-3 mb-4">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-medium text-red-600">Crisis Resources</h2>
      </div>
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.name} className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div>
              <h3 className="font-medium">{resource.name}</h3>
              <p className="text-sm text-gray-500">Available {resource.available}</p>
            </div>
            <a
              href={`tel:${resource.phone.replace(/\D/g,'')}`}
              className="flex items-center gap-2 notion-button text-red-600 hover:bg-red-50"
            >
              <PhoneIcon className="w-4 h-4" />
              {resource.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}