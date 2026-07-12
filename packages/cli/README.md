# create-react-template

CLI package for `create-react-template`, used to scaffold a React application from the `@dauphaihau/react-template` template.

This package is published as `@dauphaihau/create-react-template` and exposes the `create-react-template` command.

> **Note:** Use the full scoped name (`@dauphaihau/create-react-template`) with `bunx`/`npx`. The unscoped `create-react-template` command is only available after a global install (`npm install -g @dauphaihau/create-react-template`).

## Quick Start

```bash
bunx @dauphaihau/create-react-template my-app
```

You can also run it with npm:

```bash
npx @dauphaihau/create-react-template my-app
```

The CLI prompts for:

- Package manager: bun, npm, or pnpm
- Optional features:
  - Auth: `src/modules/auth`, current user query, auth mutations, and login/register routes
  - GitHub Actions: CI workflow for typecheck, lint, test, and build
- Whether to install dependencies after scaffolding

## Generated Project

For the generated app stack and project structure, see the [template README](https://github.com/dauphaihau/react-template/tree/production/packages/template).

## Usage

```bash
bunx @dauphaihau/create-react-template my-app
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
