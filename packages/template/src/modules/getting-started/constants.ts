export const CREATE_COMMANDS = {
  bun: 'bunx @dauphaihau/create-react-template my-app',
  npm: 'npx @dauphaihau/create-react-template my-app',
  pnpm: 'pnpm dlx @dauphaihau/create-react-template my-app',
} as const;

export const INSTALL_COMMANDS = {
  bun: 'cd my-app && bun install',
  npm: 'cd my-app && npm install',
  pnpm: 'cd my-app && pnpm install',
} as const;

export const DEV_COMMANDS = {
  bun: 'bun run dev',
  npm: 'npm run dev',
  pnpm: 'pnpm run dev',
} as const;

export type PackageManager = keyof typeof CREATE_COMMANDS;

export const PM_OPTIONS: readonly PackageManager[] = ['bun', 'npm', 'pnpm'];

export const ENV_VARS = ['VITE_API_URL'] as const;
