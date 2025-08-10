/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#14b8a6", // teal accent to match the reference
        dark: "#0b0d0f",   // deep moody background
      },
    },
  },
  plugins: [],
};
