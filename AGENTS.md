# Project Guidelines

## Workspace

This repository is a Bun workspace with three main areas:

```text
packages/
  cli/         # create-react-template CLI
  template/    # published React template
  features/    # optional scaffold features applied by the CLI
```

Run scripts with Bun from the repo root, for example `bun run release:template` or
`bun run --cwd packages/template test`.

## Stack

- **Framework**: TanStack Start (React 19)
- **Router**: TanStack Router file-based routing
- **Data fetching**: TanStack Query
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Package manager**: Bun

## Template Architecture

The template app lives under `packages/template/src` and currently follows this structure:

```text
src/
  app/
    providers/          # top-level providers
    router/
      routes/           # TanStack Router route files
    styles/             # global styles
  modules/              # domain/application modules, e.g. blog
  shared/
    client-state/       # shared client state such as theme
    config/             # app config
    error/              # shared error helpers
    hooks/              # reusable hooks
    lib/                # utilities and infra helpers
    ui/                 # reusable UI and app shells
```

Keep imports flowing from app wiring into modules/shared. Avoid pulling route-level code back into shared modules.

## Routing Conventions

- Route entry files live in `packages/template/src/app/router/routes/`
- Use TanStack Router naming such as `index.tsx`, `route.tsx`, and `$slug.tsx`
- Route-local UI belongs in `_components/` alongside the route
- Files under `_components/` are support files, not route entries
- Keep route files thin: declare the route and compose existing UI rather than embedding large amounts of business logic

## Feature Package Conventions

Feature scaffolds under `packages/features/*/files/src` should mirror the template's current structure.

Example for auth:

```text
files/src/
  app/router/routes/
  modules/auth/
    api/
    server-state/
    ui/
```

When updating a feature package, keep its generated file layout aligned with `packages/template` so scaffolded apps stay consistent.

## React and Module Patterns

- Prefer small, focused components
- Extract reusable data access into module APIs, queries, and mutations
- Keep shared primitives in `shared/ui/primitives`
- Keep app-level shells and error/not-found UI in `shared/ui/app`
- Use hooks where stateful logic is shared or complex
- Prefer composition over inheritance

Use a container/presentational split when it improves reuse or clarity, but do not force it for every route-local component.

## Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | PascalCase or route-local kebab-case files | `ThemeToggle.tsx`, `lab-sidebar.tsx` |
| Hooks | `use` prefix | `useErrorHandler.ts` |
| Utilities | camelCase | `query-client.ts` |
| Route files | TanStack Router convention | `index.tsx`, `route.tsx`, `$slug.tsx` |
| Query files | descriptive suffixes | `get-blog.query.ts`, `login.mutation.ts` |

## Code Rules

- Use TypeScript strict mode; avoid `any`
- Do not mix unrelated concerns in one commit
- Keep generated route structure and feature scaffold structure in sync
- Prefer module-local APIs/state over placing domain code in `shared`
- Add tests when changing reusable behavior or data access logic
