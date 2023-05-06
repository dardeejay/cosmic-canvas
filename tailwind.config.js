/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/*.{html,js}", "public/scripts/*.js"],
  theme: {
    extend: {
      colors: {
        customBlack: "#1D1D1F",
        customWhite: "#F5F5F7",
        primary: "#050A18",
        bdColor: "#5C5C5C",
        fontColor: "#64FCDA",
      },
      fontFamily: {
        navFont: ["Space Explorer", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Helvetica: ["Helvetica Neue", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Arial: ["Arial, Helvetica Neue", "sans-serif"],
      },
      animation: {
        rescale: "rescale 2s ease-in-out",
        appear: "appear 1.5s ease-in-out",
        appear2: "appear2 1s ease-in-out",
        reveal: "reveal 1s ease-in-out",
      },
      backgroundImage: {
        space:
          "url('https://res.cloudinary.com/dk3msiid1/image/upload/v1682114678/cosmic-canvas/peakpx_gimnlz.jpg')",
        mars: "url('https://res.cloudinary.com/dk3msiid1/image/upload/v1683315841/cosmic-canvas/mars-bg_uip4ot.jpg')",
        perseverance:
          "url('https://upload.wikimedia.org/wikipedia/commons/a/a4/Perseverance-Selfie-at-Rochette-Horizontal-V2.gif')",
        deepField:
          "url('https://res.cloudinary.com/dk3msiid1/image/upload/v1683371775/cosmic-canvas/deep-field_mlyu5r.jpg')",
      },
      keyframes: {
        rescale: {
          from: { opacity: 0, bottom: "-25rem" },
          to: { opacity: 1 },
        },
        appear: {
          from: { opacity: 0, transform: "translateY(-10rem)" },
          to: { opacity: 1 },
        },
        appear2: {
          from: {
            opacity: 0,
            transform: "translateY(-2rem)",
            transitionDelay: "2s",
          },
          to: { opacity: 1 },
        },
        reveal: {
          from: { width: "100%" },
          to: { width: "0%" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
