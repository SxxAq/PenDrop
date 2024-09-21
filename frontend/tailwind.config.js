/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          // ... other shades
          800: "#115e59",
          900: "#134e4a",
        },
      },
    },
  },
  plugins: [],
};
