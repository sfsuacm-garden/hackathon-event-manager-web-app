import { initTRPC } from '@trpc/server';
import { eventRouter } from './event/event.routes';
import { teamsRouter } from './teams/teams.routes';

const t = initTRPC.create();

export const trpcRouter = t.router({
  events: eventRouter,
  teams: teamsRouter
});

export type AppRouter = typeof trpcRouter;
