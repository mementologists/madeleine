module.exports = {
  env: {
    'es6': true
  },
  extends: [
    './node_modules/eslint-config-airbnb/index.js' 
  ],
  rules: {
    'comma-dangle': 'off',
    'react/require-default-props': 'off',
    "jsx-a11y/href-no-hash": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]

  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      'jsx': true
    }
  }
};
