/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff002c",
          secondary: "#f4002a",
          accent: "#ff580a",
          neutral: "#2f2f2f",
          "base-100": "#ffffff",
          info: "#1d5bc2",
          success: "#25d366",
          warning: "#ff5700",
          error: "#76001c",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
