import { eventRouter } from '../features/event/event.routes';
import { t } from './trpc';

export const trpcRouter = t.router({
  //TODO change event directory to be plural.
  events: eventRouter
});

export type AppRouter = typeof trpcRouter;
