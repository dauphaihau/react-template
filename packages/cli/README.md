# create-react-template

Scaffold a TanStack Start + React 19 application with TypeScript, TanStack Router, TanStack Query, Tailwind CSS, and Feature-Sliced Design conventions.

## Quick Start

```bash
bunx create-react-template my-app
```

You can also run it with npm:

```bash
npx create-react-template my-app
```

The CLI prompts for:

- Package manager: bun, npm, or pnpm
- Optional features:
  - Auth: AuthContext, `useAuth`, login route, and register route
  - GitHub Actions: CI workflow for typecheck, lint, test, and build
- Whether to install dependencies after scaffolding

## Generated Project

The generated app includes:

- React 19
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- TypeScript
- Vitest
- ESLint
- Husky and lint-staged
- Feature-Sliced Design structure

## Usage

```bash
create-react-template my-app
cd my-app
bun run dev
```

## Local Development

From the repository root:

```bash
bun run cli:build
bun run cli:dev
bun run cli:test
```

## Related Package

The app template source is published as `@dauphaihau/react-template`.

## License

MIT
