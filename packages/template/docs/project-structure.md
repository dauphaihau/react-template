# Project Structure

This project follows [Feature-Sliced Design](https://feature-sliced.design/) principles adapted for TanStack Router's file-based routing.

## Overview

```
src/
├── routes/        # TanStack Router file-based routes (also serve as pages)
├── features/      # Self-contained business feature modules
├── widgets/       # Reusable composite UI components
├── shared/        # Cross-cutting utilities and infrastructure
│   ├── api/       # API clients and DTOs
│   ├── hooks/     # Shared React hooks
│   ├── lib/       # Third-party configs and utilities
│   ├── queries/   # React Query queries and mutations
│   └── ui/        # Shared UI components
│       ├── app/        # App-aware shared UI
│       └── primitives/ # Generic primitive UI components
└── domain/        # Business rules and validators
```

## Naming Conventions

- File and module paths use lowercase kebab-case: `theme-toggle.tsx`, `error-boundary.tsx`
- React component symbols use PascalCase: `ThemeToggle`, `ErrorBoundary`
- Directory names use lowercase kebab-case: `error-display/`, `game-settings/`

## Layers

### `routes/`

TanStack Router owns this directory. Route files combine the router config (`createFileRoute`) with the page component. Keep route files focused on routing concerns (loader, head, params) and composition — delegate complex logic to features.

```
routes/
├── __root.tsx         # Root layout, providers
├── index.tsx          # Home page
├── about.tsx          # About page
├── blog.index.tsx     # Blog listing page
└── blog.$slug.tsx     # Blog post page
```

> `routeTree.gen.ts` is auto-generated — never edit it manually.

### `features/`

Self-contained modules for distinct business features. Each feature owns its components, hooks, state, and constants.

```
features/
└── <feature-name>/
    ├── components/
    ├── hooks/
    ├── <feature-name>.store.ts   # Zustand (client/UI state)
    └── <feature-name>.constants.ts
```

A feature should not import from another feature. Shared code belongs in `shared/`.

### `widgets/`

Composite UI components that are reused across multiple routes but contain more logic than a primitive. Widgets can import from `shared/` but not from `features/`.

```
widgets/
├── header.tsx
└── footer.tsx
```

### `shared/`

Infrastructure and utilities used across 2+ features or routes.

| Folder | Purpose |
|---|---|
| `ui/primitives/` | Generic, framework-agnostic UI components (shadcn/ui, icons) — no app knowledge |
| `ui/app/` | App-aware shared UI — knows about routes, errors, or app context |
| `lib/` | App config and third-party setup (site metadata, query client) |
| `api/` | API clients and DTOs, organized by domain |
| `queries/` | React Query queries and mutations (server state source of truth) |
| `hooks/` | Cross-feature React hooks |

**`shared/ui/app/` vs `widgets/`**: If a shared component carries data/state logic (hooks, queries, context) → `widgets/`. If it is app-aware UI with no hooks or queries of its own → `shared/ui/app/`.

Import shared UI via the barrel:

```ts
import { ThemeToggle } from '#/features/theme'
```

### `domain/`

Pure business logic — validators, calculations, type guards — with no framework dependencies. Add a subdirectory per domain concept when needed.

```
domain/
└── <domain-name>/
    └── validators.ts
```

## Dependency Rules

```
routes → features → widgets → shared
                               ↑
domain ────────────────────────┘ (independent, no outward deps)
```

- Routes may import from features, widgets, and shared
- Features may import from widgets and shared, not from other features
- Widgets may import from shared only
- Domain has no imports from other layers

## State Management

| Concern | Tool | Location |
|---|---|---|
| Server data | React Query | `shared/queries/` |
| Client / UI state | Zustand | `features/<name>/<name>.store.ts` |

## Path Aliases

The `#/` alias (configured in `package.json` `imports` and `tsconfig.json`) maps to `src/`:

```ts
import { cn } from '#/shared/lib/utils'
import { ThemeToggle } from '#/features/theme'
import Header from '#/widgets/header'
```
