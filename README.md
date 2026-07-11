# react-template

Monorepo for the `create-react-template` CLI and the React application template it generates.

## Packages

```
react-template/
  packages/
    cli/          # Published CLI package: @dauphaihau/create-react-template
    template/     # Published React app template: @dauphaihau/react-template
    features/     # Optional feature templates copied by the CLI
```

## Generated App

The CLI scaffolds a TanStack Start + React 19 application with:

- TypeScript
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- Vitest
- ESLint
- Husky and lint-staged
- Error boundary with fallback UI
- Type-safe environment variables
- Theme toggle
- Layered project structure

Optional features are added by CLI prompt:

- Auth: `src/modules/auth`, current user query, auth mutations, and login/register routes
- GitHub Actions: CI workflow for typecheck, lint, test, and build

## Using the CLI

```bash
bunx create-react-template my-app
```

Or with npm:

```bash
npx create-react-template my-app
```

Then run the generated app:

```bash
cd my-app
bun run dev
```

## Local Development

Install dependencies from the repository root:

```bash
bun install
```

Run the template app locally:

```bash
bun run template:dev
```

Build the CLI:

```bash
bun run cli:build
```

Run the CLI in watch mode:

```bash
bun run cli:dev
```

Test the CLI against the local template:

```bash
bun run cli:test
```

Link the CLI locally for manual testing:

```bash
bun run cli:link
```

## Working on Optional Features

Optional features live in `packages/features/<id>/`.

Each feature can include:

- `files/`: new files copied into the generated project
- `patches/`: full-file replacements for existing template files
- `deps.json`: dependencies added when the feature is selected

When adding a new feature:

1. Create `packages/features/<id>/`.
2. Add the option in `packages/cli/src/index.ts`.
3. Add the feature type in `packages/cli/src/types.ts`.

## Publishing

Release the CLI package:

```bash
bun run release:cli
```

Release the template package:

```bash
bun run release:template
```

## License

MIT
