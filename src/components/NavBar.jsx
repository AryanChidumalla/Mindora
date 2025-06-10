import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="border-b border-gray sticky top-0 z-50 py-4 px-12 md:px-36 lg:px-52 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">
          <Link to="/">Mindora</Link>
        </h1>
        <Link
          to="/register"
          className="px-4 py-2 rounded-md bg-primary text-secondary"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};
