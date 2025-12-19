/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00C2FF",
          purple: "#A78BFA",
          lime: "#A3E635",
          orange: "#FB923C",
        },
      },
    },
  },
  plugins: [],
}
