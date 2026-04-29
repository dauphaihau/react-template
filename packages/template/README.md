# @dauphaihau/react-template

A TanStack Start + React 19 starter template with TypeScript, TanStack Router, TanStack Query, Tailwind CSS, and Feature-Sliced Design conventions.

This package is the template source used by the `create-react-template` CLI.

## What's Included

- React 19
- TanStack Router file-based routing
- TanStack Query for server state
- Tailwind CSS v4
- TypeScript
- Vitest
- ESLint
- Husky and lint-staged
- Error boundary with fallback UI
- Zod-validated environment variables
- Theme toggle with light and dark modes
- Feature-Sliced Design folder structure

## Create a Project

Use the CLI package:

```bash
bunx create-react-template my-app
```

Or with npm:

```bash
npx create-react-template my-app
```

Then start the app:

```bash
cd my-app
bun run dev
```

## Template Structure

```txt
src/
  routes/       # Route entry points
  widgets/      # Composed UI blocks
  features/     # User interactions and use-case logic
  entities/     # Business domain models and UI
  shared/
    ui/         # Reusable UI primitives
    lib/        # Utilities and helpers
    api/        # API clients and server functions
```

Imports flow downward:

```txt
routes -> widgets -> features -> entities -> shared
```

## Scripts

Inside a generated project:

```bash
bun run dev
bun run build
bun run test
bun run lint
```

## Related Package

The CLI is published as `@dauphaihau/create-react-template`.

## License

MIT
