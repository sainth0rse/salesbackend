module.exports = {
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unsafe-assignment': ['error', { ignoreTests: true }],
    '@typescript-eslint/no-unsafe-member-access': [
      'error',
      { ignoreTests: true },
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['node_modules/', 'dist/'],
};
