/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom animation keyframes for floating elements
      animation: {
        blob: "blob 10s infinite", // Slower = smoother
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          // translate3d forces GPU acceleration
          "0%": { transform: "translate3d(0px, 0px, 0px) scale(1)" },
          "33%": { transform: "translate3d(30px, -50px, 0px) scale(1.1)" },
          "66%": { transform: "translate3d(-20px, 20px, 0px) scale(0.9)" },
          "100%": { transform: "translate3d(0px, 0px, 0px) scale(1)" },
        },
        float: {
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -20px, 0) rotate(10deg)" },
          "100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
}
