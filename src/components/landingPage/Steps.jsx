import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Steps = () => {
  const steps = [
    {
      title: "Create Your Account",
      description:
        "Sign up in minutes and customize your profile to start your mental health journey",
    },
    {
      title: "Track Your Mood",
      description:
        "Use our simple mood tracker to log your daily emotional state and add context notes",
    },
    {
      title: "Journal Your Thoughts",
      description:
        "Respond to therapeutic prompts or write freely in your private digital journal",
    },
    {
      title: "Monitor Progress",
      description:
        "View your mental health trends and receive insights to better understand yourself",
    },
  ];

  return (
    <section>
      <div className="py-24 px-12 md:px-36 lg:px-52 text-center flex flex-col gap-12 items-center bg-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-primary text-center">
            How Mindora Works
          </h2>
          <p className="text-xl text-primary text-center">
            We've simplified the process of getting mental health support.
            Follow these steps to start your journey to well-being.
          </p>
        </div>

        <div className="flex flex-col gap-8 w-full items-start">
          {steps.map((steps, index) => (
            <div key={index} className="flex items-start space-x-4 p-2">
              <div className="text-xl text-secondary bg-primary w-12 h-12 rounded-lg flex items-center justify-center text-primary p-2">
                {index + 1}
              </div>
              <div className="flex flex-col items-start">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                  {steps.title}
                </div>
                <div className="text-primary text-start">
                  {steps.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/register"
          className="px-4 py-2 rounded-md bg-primary text-secondary inline-flex items-center w-fit"
        >
          Start Your Journey
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
};
