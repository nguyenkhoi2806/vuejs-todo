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
    "simple-import-sort/imports": "off",
    "simple-import-sort/exports": "off",
    "vue/multi-word-component-names": 0,
    "vue/no-reserved-component-names": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
};
