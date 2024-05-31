module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
