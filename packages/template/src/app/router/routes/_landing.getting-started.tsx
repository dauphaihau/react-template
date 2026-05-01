import { createFileRoute } from '@tanstack/react-router';
import { GettingStarted } from '#/modules/getting-started';

export const Route = createFileRoute('/_landing/getting-started')({
  component: GettingStarted,
  head: () => ({
    meta: [{ title: 'Getting Started — React Template' }],
  }),
});
