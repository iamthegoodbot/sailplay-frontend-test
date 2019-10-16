module.exports = {
  root: true,
  extends: [
    // 'standard',
    // 'plugin:vue/essential'
    "eslint:recommended"
  ],
  "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 2018,
      "ecmaFeatures": {
          "globalReturn": false,
          "impliedStrict": false,
          "jsx": false
      }
  },
  "parser": "vue-eslint-parser",
  plugins: [
    'vue'
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    'no-console': 0,
    'no-undef': 0,
    'semi': [2, 'always'],
    'space-before-function-paren': 0,
    'object-property-newline': 0,
    'vue/order-in-components': 0,
    "vue/max-attributes-per-line": [2, {
      "singleline": 2,
      "multiline": {
        "max": 2,
        "allowFirstLine": false
      }
    }]
  }
}