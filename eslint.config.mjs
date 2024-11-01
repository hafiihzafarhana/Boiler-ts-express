import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    ignores: [
      'config/*',
      'seeders/*',
      'migrations/*',
      '.dockerignore',
      'Dockerfile',
      'Dockerfile.dev',
      'Jenkinsfile',
      'dist/*' // Tambahkan 'dist/*' di sini
    ]
  },
  { languageOptions: { globals: globals.browser, parser: '@typescript-eslint/parser' } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-array-constructor': 'off',
      'no-multiple-empty-lines': [2, { max: 2 }],
      semi: [2, 'always'],
      curly: ['warn'],
      'prefer-template': ['warn'],
      'space-before-function-paren': [0, { anonymous: 'always', named: 'always' }],
      camelcase: 0,
      'no-return-assign': 0,
      quotes: ['error', 'single'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-unresolved': 0
      // 'import/order': [
      //   'warn',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type', 'object'],
      //     'newlines-between': 'always'
      //   }
      // ]
    }
  }
];
