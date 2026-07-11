import { createFileRoute } from '@tanstack/react-router';
import { LabOverview } from './_components/lab-overview';

export const Route = createFileRoute('/lab/')({
  component: LabOverview,
});
