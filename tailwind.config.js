/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        light: {
          primary: "#01233f",
          secondary: "#f4002a",
          accent: "#ff580a",
          neutral: "#2f2f2f",
          "base-100": "#2B2B2B",
          info: "#1d5bc2",
          success: "#25d366",
          warning: "#ff5700",
          error: "#76001c",
        },
        dark: {
          primary: "#01233f",
          secondary: "#f4002a",
          accent: "#ff580a",
          neutral: "#2f2f2f",
          "base-100": "#2B2B2B",
          info: "#1d5bc2",
          success: "#25d366",
          warning: "#ff5700",
          error: "#76001c",
        }
      },
    ],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};


// #908233
// #777777
// #444444
// #333333
// #0e2e49 azul2
// #292929
// #222222
// #01233f azul1