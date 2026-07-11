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
  // TanStack Router file-based routing: lowercase, dots, $params, __root, hyphens
  {
    files: ['src/app/router/routes/**/*.{tsx,ts}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  // TanStack internal identifiers (__TANSTACK_QUERY_CLIENT__) and Vite env vars
  {
    files: ['src/shared/lib/**/*.{ts,tsx}', 'src/vite-env.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  // App, modules, and shared infrastructure use lowercase kebab-case filenames.
  // Middle extensions like *.api.ts and *.mutation.ts are allowed.
  {
    files: [
      'src/app/providers/**/*.{ts,tsx}',
      'src/modules/**/*.{ts,tsx}',
      'src/shared/**/*.{ts,tsx}',
    ],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  // Test files use *.test.ts / *.spec.ts convention — exempt from KEBAB_CASE check.
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
];
