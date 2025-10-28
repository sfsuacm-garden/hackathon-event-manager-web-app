import { createTRPCReact } from '@trpc/react-query';
import { inferRouterInputs } from '@trpc/server';
import { AppRouter } from '../../../shared/trpc';

/**
 *  The critical entry point for connection between the backedn and frontend. This should be seperated from the rest of the app logic to avoid calls outside of the client.
 **/
export const trpc = createTRPCReact<AppRouter>();
export type RouterInputs = inferRouterInputs<AppRouter>;
