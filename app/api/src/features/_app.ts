import { initTRPC } from '@trpc/server';
import { eventRouter } from './event/event.routes';

const t = initTRPC.create();

export const trpcRouter = t.router({
  events: eventRouter
});

export type AppRouter = typeof trpcRouter;
