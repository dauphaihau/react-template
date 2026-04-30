# create-react-template

CLI package for `create-react-template`, used to scaffold a React application from the `@dauphaihau/react-template` template.

This package is published as `@dauphaihau/create-react-template` and exposes the `create-react-template` command.

## Quick Start

```bash
bunx create-react-template my-app
```

You can also run it with npm:

```bash
npx create-react-template my-app
```

The CLI prompts for:

- Package manager: bun, npm, or pnpm
- Optional features:
  - Auth: AuthContext, `useAuth`, login route, and register route
  - GitHub Actions: CI workflow for typecheck, lint, test, and build
- Whether to install dependencies after scaffolding

## Generated Project

For the generated app stack and project structure, see the template README:

https://github.com/dauphaihau/react-template/tree/main/packages/template

## Usage

```bash
create-react-template my-app
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
