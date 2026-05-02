import { createFileRoute } from '@tanstack/react-router';
import { LabOverview } from '#/modules/lab';

export const Route = createFileRoute('/lab/')({
  component: LabOverview,
});
