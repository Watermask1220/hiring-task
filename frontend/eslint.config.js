import react from 'eslint-plugin-react';

export default {
  settings: {
    react: { version: 'detect' },
  },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
