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
      },
      animation: {
        rescale: "rescale 2s ease-in-out",
        appear: "appear 1.5s ease-in-out",
        appear2: "appear2 1s ease-in-out",
      },
      backgroundImage: {
        space:
          "url('https://res.cloudinary.com/dk3msiid1/image/upload/v1682114678/cosmic-canvas/peakpx_gimnlz.jpg')",
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
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
