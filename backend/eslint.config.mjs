import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
       "@typescript-eslint/no-explicit-any": "off",
       "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    },
  },
];

