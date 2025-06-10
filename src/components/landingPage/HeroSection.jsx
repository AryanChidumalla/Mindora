import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section>
      <div className="py-24 px-12  md:px-36 lg:px-52 text-center flex flex-col gap-12 items-center bg-white ">
        <h1 className="text-5xl font-bold text-primary">
          Your Mental Health Journey Made Simple
        </h1>
        <p className="text-xl text-primary">
          Track your mood, journal your thoughts, and understand your mental
          health patterns with our intuitive and private platform. Your
          well-being journey starts here.
        </p>
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
