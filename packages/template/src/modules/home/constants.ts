import {
  Atom,
  Component,
  FileCode2,
  FlaskConical,
  Navigation,
  Package,
  RefreshCcw,
  ShieldCheck,
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

export const QUERY_STATES = [
  { name: 'fresh', color: '#22c55e' },
  { name: 'stale', color: '#f59e0b' },
  { name: 'fetching', color: '#3b82f6' },
  { name: 'error', color: '#ef4444' },
] as const;

export const STACK_ROWS = [
  { name: 'Vite', role: 'build', badge: 'SPA' },
  { name: 'TanStack Router', role: 'routing', badge: 'typed' },
  { name: 'TanStack Query', role: 'data', badge: 'cache' },
  { name: 'TypeScript', role: 'types', badge: 'strict' },
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
    name: 'Zod',
    desc: 'Validation',
    href: 'https://zod.dev',
    icon: ShieldCheck,
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
