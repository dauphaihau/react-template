# Project Guidelines

## Stack

- **Framework**: TanStack Start (React)
- **Router**: TanStack Router (file-based routing in `src/routes/`)
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Package manager**: Bun (`bun run <script>`)

## Architecture: Feature-Sliced Design (FSD)

```
src/
  routes/       # Pages — route entry points only, no business logic
  widgets/      # Composed UI blocks (Header, Footer, Sidebar)
  features/     # User interactions / use-case logic
  entities/     # Business domain models & their UI
  shared/
    ui/         # Pure, reusable UI primitives
    lib/        # Utilities, helpers
    api/        # API clients / server functions
```

Imports flow **downward only**: `routes → widgets → features → entities → shared`. Never import upward.

## React Design Patterns

### Container / Presentational split

Every non-trivial component must be split into two files:

```
ComponentName/
  index.ts                      # barrel export
  ComponentName.tsx             # Presentational — pure JSX, props only, no hooks/data
  ComponentName.container.tsx   # Container — data fetching, state, passes props down
```

**Presentational** rules:
- Accepts only typed props — no direct store/query access
- No side effects, no data fetching
- Fully controlled via props; can have local UI state (e.g. `isOpen`)
- Export as named export

**Container** rules:
- Calls hooks (`useQuery`, `useLoaderData`, TanStack Router loaders, context)
- Transforms data into the shape the presentational component expects
- No JSX logic beyond passing props
- Export as named export; re-export through `index.ts`

**Example**:

```tsx
// UserCard.tsx — Presentational
interface UserCardProps {
  name: string
  avatar: string
  role: string
}
export function UserCard({ name, avatar, role }: UserCardProps) {
  return <div>...</div>
}

// UserCard.container.tsx — Container
export function UserCardContainer({ userId }: { userId: string }) {
  const { data } = useQuery(userQuery(userId))
  if (!data) return null
  return <UserCard name={data.name} avatar={data.avatar} role={data.role} />
}

// index.ts
export { UserCardContainer as UserCard } from './UserCard.container'
export type { UserCardProps } from './UserCard'
```

### Compound Components

Use for components with multiple related sub-parts:

```tsx
// Card.tsx
export function Card({ children }: { children: React.ReactNode }) { ... }
Card.Header = function CardHeader(...) { ... }
Card.Body   = function CardBody(...)   { ... }
Card.Footer = function CardFooter(...) { ... }
```

### Render Props / children as function

Use when a parent needs to share state without prescribing layout.

### Custom hooks

Extract all stateful logic into `use*.ts` hooks. A component file should read like a template.

## File & Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Container files | `*.container.tsx` | `UserCard.container.tsx` |
| Hooks | `use` prefix | `useUserProfile.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Route files | TanStack Router convention | `blog.$slug.tsx` |

## Code Rules

- Always split data/logic from presentation (Container/Presentational)
- No business logic inside route files — delegate to widgets/features
- Prefer composition over inheritance
- Keep components small; if JSX exceeds ~80 lines, split it
- Use TypeScript strict mode; no `any`
- Do not mix data fetching and rendering in the same component
