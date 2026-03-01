# create-react-template

A CLI scaffolding tool for a production-ready **TanStack Start + React 19** app with [Feature-Sliced Design](https://feature-sliced.design/) architecture.

## Quick Start

```bash
bunx create-react-template my-app
# or
npx create-react-template my-app
```

The CLI will prompt you for:
- **Package manager** — bun, npm, or pnpm
- **Optional features** — Auth (AuthContext, `useAuth` hook, login/register routes)

Then run your app:

```bash
cd my-app
bun run dev
```

## Template Stack

| Tool | Purpose |
|------|---------|
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework (SSR/SSG) |
| [TanStack Router](https://tanstack.com/router) | File-based routing in `src/routes/` |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Vitest](https://vitest.dev/) | Unit & integration testing |
| TypeScript | Strict mode enabled |

## Architecture: Feature-Sliced Design

```
src/
  routes/       # Route entry points only — no business logic
  widgets/      # Composed UI blocks (Header, Footer, Sidebar)
  features/     # User interactions and use-case logic
  entities/     # Business domain models and their UI
  shared/
    ui/         # Pure, reusable UI primitives
    lib/        # Utilities and helpers
    api/        # API clients and server functions
```

Imports flow **downward only**: `routes → widgets → features → entities → shared`.

## Scripts (inside generated project)

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run test      # Run tests with Vitest
bun run lint      # Lint with ESLint
bun run format    # Format with Prettier
```

---

## Monorepo (this repo)

```
react-template/
  packages/
    cli/          # The create-react-template CLI (published to npm)
    template/     # The React app template source
    features/     # Optional feature templates (auth, …)
  content/        # Sample blog MDX posts
  docs/
```

### Working on the CLI

```bash
# Build the CLI
bun run cli:build

# Watch mode during development
bun run cli:dev

# Link locally to test with bunx / npx
bun run cli:link

# Run against the local bin directly
bun run cli:test
```

### Adding a New Optional Feature

1. Create `packages/features/<id>/` with:
   - `files/` — new files to copy into the project
   - `patches/` — full-file replacements for existing template files
   - `deps.json` — additional dependencies to install
2. Add the option to `packages/cli/src/index.ts`
3. Add the type to `packages/cli/src/types.ts`

## License

MIT
