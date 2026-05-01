import {
  Atom,
  Component,
  FileCode2,
  FlaskConical,
  ListChecks,
  Navigation,
  Package,
  RefreshCcw,
  Wind,
  Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ROUTE_FILES = [
  'index.tsx',
  'blog.tsx',
  'blog.$slug.tsx',
  'about.tsx',
];

export const REPO_BASE_URL = 'https://github.com/dauphaihau/react-template';

export const REPO_REF = 'production';

export const ROUTING_SOURCE_URL =
  `${REPO_BASE_URL}/tree/${REPO_REF}/packages/template/src/app/router`;

export const ARCH_SOURCE_URL =
  `${REPO_BASE_URL}/tree/${REPO_REF}/packages/template/src`;

export const DATA_SOURCE_URL =
  `${REPO_BASE_URL}/tree/${REPO_REF}/packages/template/src/shared`;

export const QUERY_STATES = [
  { name: 'fresh', color: '#22c55e' },
  { name: 'stale', color: '#f59e0b' },
  { name: 'fetching', color: '#3b82f6' },
  { name: 'error', color: '#ef4444' },
] as const;

export const ARCH_LAYERS = [
  { layer: 'app/', role: 'bootstrap', badge: 'entry' },
  { layer: 'modules/', role: 'business', badge: 'domain' },
  { layer: 'shared/', role: 'cross-cutting', badge: 'reusable' },
] as const;

export const TECH_COLS = 5;

export const techStack: {
  name: string;
  desc: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    name: 'Vite',
    desc: 'Build',
    href: 'https://vite.dev',
    icon: Zap,
  },
  {
    name: 'TanStack Router',
    desc: 'Routing',
    href: 'https://tanstack.com/router',
    icon: Navigation,
  },
  {
    name: 'React Query',
    desc: 'Data',
    href: 'https://tanstack.com/query',
    icon: RefreshCcw,
  },
  {
    name: 'TypeScript',
    desc: 'Language',
    href: 'https://typescriptlang.org',
    icon: FileCode2,
  },
  {
    name: 'Tailwind v4',
    desc: 'Styling',
    href: 'https://tailwindcss.com',
    icon: Wind,
  },
  {
    name: 'Stylistic',
    desc: 'Lint & Style',
    href: 'https://eslint.style',
    icon: ListChecks,
  },
  {
    name: 'Vitest',
    desc: 'Testing',
    href: 'https://vitest.dev',
    icon: FlaskConical,
  },
  {
    name: 'React 19',
    desc: 'UI',
    href: 'https://react.dev',
    icon: Atom,
  },
  {
    name: 'shadcn/ui',
    desc: 'Components',
    href: 'https://ui.shadcn.com',
    icon: Component,
  },
  {
    name: 'Bun',
    desc: 'Runtime',
    href: 'https://bun.sh',
    icon: Package,
  },
];
