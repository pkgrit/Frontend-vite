/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
    screens: {
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      md: "768px",
      // => @media (min-width: 768px)
      sm: "375px",
      // => @media (min-width: 640px) { ... }
    },
  },
  plugins: [],
};
