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
  env: {
    "jasmine": true,
    "browser": true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      'jsx': true
    }
  }
};
