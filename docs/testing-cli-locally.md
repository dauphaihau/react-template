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

**Option A (native, run from anywhere)** — requires `bun link` from step above:

```bash
LOCAL_TEMPLATE=1 bunx create-react-template my-app
```

**Option B (bin directly)** — run from the repo root:

```bash
LOCAL_TEMPLATE=1 bun packages/cli/bin/index.js /tmp/my-app
```

## Tips

- All `bun packages/cli/bin/index.js` commands must be run from the **repo root**.
- Always rebuild (`bun run build`) before testing Option A or B after source changes.
- Use Option C when iterating on CLI source to skip manual rebuilds.
