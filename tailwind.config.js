module.exports = {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    colors: {},
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
