import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const Benefits = () => {
  const benefits = [
    {
      title: "Daily Mood Tracking",
      description:
        "Log your emotions and track patterns over time to better understand your mental health journey",
    },
    {
      title: "Guided Journaling",
      description:
        "Access therapeutic writing prompts designed by mental health professionals to help process your thoughts and feelings",
    },
    {
      title: "Progress Analytics",
      description:
        "Visualize your mental health journey with intuitive charts and insights that help identify triggers and improvements",
    },
    {
      title: "Personalized Guidance",
      description:
        "Receive tailored recommendations and coping strategies based on your unique patterns and needs",
    },
  ];
  return (
    <section>
      <div className="py-24 px-12 md:px-36 lg:px-52 text-center flex flex-col gap-12 items-center bg-off-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-primary text-center">
            Why Choose Mindora
          </h2>
          <p className="text-xl text-primary text-center">
            From mood tracking to secure video therapy, we combine cutting-edge
            technology with licensed professionals for comprehensive mental
            health support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border-2 border-primary rounded-lg p-4"
            >
              <CheckCircleIcon className="w-6 h-6 text-green flex-shrink-0" />
              <div className="flex flex-col items-start">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </div>
                <div className="text-primary text-start">
                  {benefit.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
