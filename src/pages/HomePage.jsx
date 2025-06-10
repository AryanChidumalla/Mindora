import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  HomeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Dashboard from "./Dashboard";
import Articles from "./Articles";
import Journal from "./Journal";
import Settings from "./Settings";

export const HomePage = () => {
  const [heroSection, setHeroSection] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: <HomeIcon className="default-icon" /> },
    { id: "articles", icon: <BookOpenIcon className="default-icon" /> },
    { id: "journal", icon: <PencilIcon className="default-icon" /> },
  ];

  return (
    <div className="bg-white w-full h-screen flex">
      {/* Sidebar */}
      <div className="h-full border-r-2 border-gray flex flex-col justify-between px-2 py-4 items-center gap-12">
        <button className="w-12 h-12 bg-primary text-secondary flex justify-center items-center rounded cursor-pointer font-bold text-lg">
          M
        </button>

        {/* Navigation Buttons */}
        <div className="flex flex-col h-full gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setHeroSection(item.id)}
              className={`w-12 h-10 flex justify-center items-center rounded cursor-pointer ${
                heroSection === item.id
                  ? "bg-primary text-secondary"
                  : "bg-transparent text-primary"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setHeroSection("settings")}
          className={`w-12 h-12 flex justify-center items-center rounded cursor-pointer ${
            heroSection === "settings"
              ? "bg-black text-white"
              : "bg-transparent text-black"
          }`}
        >
          <AdjustmentsHorizontalIcon className="default-icon" />
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1">
        {(() => {
          switch (heroSection) {
            case "dashboard":
              return <Dashboard />;
            case "articles":
              return <Articles />;
            case "journal":
              return <Journal />;
            case "settings":
              return <Settings />;
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </div>
  );
};
