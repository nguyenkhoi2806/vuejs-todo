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
  },
  plugins: [require("tw-elements/dist/plugin")],
};
