//  @ts-check

import dauphaihau from '@dauphaihau/eslint-config';

export default [
  { ignores: ['.content-collections/**'] },
  ...await dauphaihau({
    typescript: true,
    react: true,
  }),
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'check-file/filename-naming-convention': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
];
