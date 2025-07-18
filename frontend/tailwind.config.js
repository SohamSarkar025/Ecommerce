/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "rabit-red": "#ea2e0e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
