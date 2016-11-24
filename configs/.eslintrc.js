module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    jasmine: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'new-cap': 0,
    'no-constant-condition': 0,
    'no-use-before-define': [
      "error",
      {
        "functions": false,
        "classes": true,
      },
    ],
  },
};