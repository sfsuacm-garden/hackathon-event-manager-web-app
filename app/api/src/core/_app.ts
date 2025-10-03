import { eventRouter } from '../features/event/event.routes';
import { teamsRouter } from '../features/teams/teams.routes';
import { t } from './trpc';

export const trpcRouter = t.router({
  //TODO change event directory to be plural.
  events: eventRouter,
  teams: teamsRouter
});

export type AppRouter = typeof trpcRouter;
