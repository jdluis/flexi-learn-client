/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#03091e",
        secondary: "#265e4a",
        terciary: "#121f3d",
      },
      cursor: {
        pointer: "pointer",
      },
    },
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  plugins: [],
};
