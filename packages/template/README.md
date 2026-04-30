# @dauphaihau/react-template

A TanStack Start + React 19 starter template with TypeScript, TanStack Router, TanStack Query, Tailwind CSS, and a module-based folder structure.

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
- Module-based folder structure

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
  app/
    index.tsx       # Entry point
    router/         # Router factory, generated route tree, and route files
      routes/       # File-based route components
    styles/         # Global styles
  modules/          # Business modules
  shared/
    ui/
      widgets/      # Composed UI blocks (Header, Footer)
      app/          # App-aware shared UI
      primitives/   # Generic UI primitives
    lib/            # Utilities and helpers
    api/            # API clients and server functions
```

Imports flow downward:

```txt
app -> modules -> shared
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
