import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  BookOpenText,
  Compass,
  FileQuestion,
} from 'lucide-react';

export interface LabNavItem {
  title: string
  to?: '/lab/blog' | '/lab/test-error'
  href?: string
  description: string
  icon: LucideIcon
}

export interface LabNavGroup {
  title: string
  items: LabNavItem[]
}

export const labNavGroups: LabNavGroup[] = [
  {
    title: 'Examples',
    items: [
      {
        title: 'Blog Fetch',
        to: '/lab/blog',
        description: 'Review query loading and fetched content states.',
        icon: BookOpenText,
      },
      {
        title: 'Error Boundary',
        to: '/lab/test-error',
        description: 'Trigger sync, async, and network failures.',
        icon: AlertTriangle,
      },
    ],
  },
];

export const labQuickLinks = [
  {
    title: 'Inspect fetch state',
    description: 'Use the blog route to validate success, loading, and empty/error branches.',
    to: '/lab/blog' as const,
    icon: Compass,
  },
  {
    title: 'Break the route on purpose',
    description: 'Use the error boundary page to verify fallback UI and reset behavior.',
    to: '/lab/test-error' as const,
    icon: AlertTriangle,
  },
  {
    title: 'Check not found UI',
    description: 'Open a missing lab route and confirm the shared 404 screen feels right.',
    href: '/lab/does-not-exist',
    icon: FileQuestion,
  },
];
