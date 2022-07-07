const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
