export const PM_COMMANDS = {
  bun: 'bun install',
  npm: 'npm install',
  pnpm: 'pnpm install',
  yarn: 'yarn install',
} as const;

export type PackageManager = keyof typeof PM_COMMANDS;

export const PM_OPTIONS: readonly PackageManager[] = ['bun', 'npm', 'pnpm', 'yarn'];

export const ENV_VARS = ['VITE_API_URL'] as const;
