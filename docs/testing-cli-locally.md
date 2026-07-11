# Testing the CLI Locally

## Prerequisites

- [Bun](https://bun.sh) installed

## 1. Build the CLI

```bash
cd packages/cli
bun run build
```

## 2. Choose a test method

### Option A: `bun link` (mirrors the published `bunx` experience)

```bash
# Inside packages/cli/
bun link

# Run from any directory
bunx create-react-template my-app
# or
create-react-template my-app
```

Unlink when done:

```bash
bun unlink @dauphaihau/create-react-template
```

### Option B: Run the bin directly (fastest for quick checks)

```bash
bun packages/cli/bin/index.js my-app
```

### Option C: Watch mode (auto-rebuild on source changes)

```bash
# Terminal 1
cd packages/cli && bun run dev

# Terminal 2 — re-run after each change
bun packages/cli/bin/index.js my-app
```

## Testing local template changes

By default the CLI pulls the template from GitHub via degit, so local changes to
`packages/template/` are not reflected until pushed.

Set `LOCAL_TEMPLATE=1` to copy from `packages/template/` directly instead — no push required.

If you scaffold without `LOCAL_TEMPLATE=1`, the generated app will still use the
current GitHub template even if you already changed files under
`packages/template/` locally.

**Option A (native, run from anywhere)** — requires `bun link` from step above:

```bash
LOCAL_TEMPLATE=1 bunx create-react-template my-app
```

**Option B (bin directly)** — run from the repo root:

```bash
LOCAL_TEMPLATE=1 bun packages/cli/bin/index.js /tmp/my-app
```

## Dev server note

The template disables the TanStack devtools event-bus server by default to avoid
local port collisions on `42069`.

If you explicitly want that event bus enabled while developing a generated app,
start the dev server with:

```bash
TANSTACK_DEVTOOLS_EVENT_BUS=true bun run dev
```

## Tips

- All `bun packages/cli/bin/index.js` commands must be run from the **repo root**.
- Always rebuild (`bun run build`) before testing Option A or B after source changes.
- Use Option C when iterating on CLI source to skip manual rebuilds.
- If a generated app still shows old template behavior, inspect its `vite.config.ts`.
  If it still contains plain `devtools()` and no `routeFileIgnorePattern`, it was
  scaffolded from the old remote template rather than your local changes.
