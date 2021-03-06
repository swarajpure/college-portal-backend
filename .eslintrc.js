module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-trailing-spaces': 'error',
    'consistent-return': 'error',
    'comma-dangle': ['error', 'never']
  }
};
