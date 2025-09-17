import { createTRPCReact } from '@trpc/react-query';
import {AppRouter } from '../../../shared/trpc';

export const trpc = createTRPCReact<AppRouter>();
