/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],

  theme: {
    container: {
      center: true,
      padding: " 20px  ",
    },

    extend: {
      colors: {
        primary: {
          10: "#ceefce",
          20: "#85d685",
          40: "#6cce6c",
          50: "#0aad0a",
          60: "#54c654",
          70: "#3bbd3b",
          80: "#23b523",
          90: "#0aad0a",
          100: "#099c09",
          200: "#088a08",
          300: "#077907",
          400: "#066806",
          500: "#055705",
          600: "#055705",
          700: "#033403",
          800: "#022302",
          900: "#011101",
          950: "#000000",
        },
      },
      fontFamily: "Cairo Variable",
      screens: {
        "2xL": "1920px",
        xsm: "300px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
