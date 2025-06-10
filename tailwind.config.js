import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#323232",
        secondary: "#F3F4F6",
        gray: "#E5E7EB",
        red: "#EF4444",
        green: "#10B981",
        white: "#FEFEFE",
        "off-white": "#F7F6F3",
        "notion-black": "#2F3437",
        "notion-gray": "#787774",
        "notion-light-gray": "#E3E3E1",
        "notion-white": "#FFFFFF",
        "notion-border": "#E9ECEF",
      },
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans],
        // sans: ["Inter var", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
