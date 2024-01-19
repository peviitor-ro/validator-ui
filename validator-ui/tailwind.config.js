/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-container": "#f0f0f0",
        "bg-header": "#e4e4e4",
      },
    },
  },
  plugins: [],
};
