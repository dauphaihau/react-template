import { createFileRoute } from '@tanstack/react-router';
import { Home } from '#/modules/home';

export const Route = createFileRoute('/_landing/')({ component: Home });
