/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-container": "#f0f0f0",
        "bg-header": "#e4e4e4",
        "bg-primary": "#db7900",
        "bg-cards": "#eeeeee",

        "text-primary": "#db7900",
        "text-secondary": "#4f4f4f",

        "border-primary": "#db7900",
      },
      boxShadow: {
        "card-shadow": "0px 2px 5px 0.5px rgba(80, 79, 79, 0.72);",
      },
    },
  },
  plugins: [],
};
