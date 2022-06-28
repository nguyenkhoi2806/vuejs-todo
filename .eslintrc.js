module.exports = {
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-essential",
  ],
  plugins: ["simple-import-sort"],
  parser: "vue-eslint-parser",
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "vue/multi-word-component-names": 0,
    "vue/no-reserved-component-names": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
};
