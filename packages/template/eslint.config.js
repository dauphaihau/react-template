//  @ts-check

import dauphaihauConfig from '@dauphaihau/eslint-config';

export default [
  { ignores: ['.content-collections/**'] },
  ...await dauphaihauConfig(),
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  // Entry-point files that are not React components
  {
    files: ['src/main.tsx', 'src/router.tsx'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  // TanStack Router file-based routing: lowercase, dots, $params, __root, hyphens
  {
    files: ['src/routes/**/*.{tsx,ts}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  // Server response types use snake_case field names
  {
    files: ['src/shared/api/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  // TanStack internal identifiers (__TANSTACK_QUERY_CLIENT__) and Vite env vars
  {
    files: ['src/shared/lib/**/*.{ts,tsx}', 'src/vite-env.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  // shared/ui uses kebab-case filenames (button.tsx, input.tsx, etc.)
  {
    files: ['src/shared/ui/**/*.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
];
