const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,vue}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        blue: colors.blue,
        green: colors.green,
        black: colors.black,
        red: colors.red,
        gray: colors.gray,
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("tailwindcss/colors")],
};
