import { eventRouter } from '../features/event/event.routes';
import { t } from './trpc';
import { applicationRouter } from '../features/application/application.routes';

export const trpcRouter = t.router({
  //TODO change event directory to be plural.
  events: eventRouter,
  applications: applicationRouter
});

export type AppRouter = typeof trpcRouter;
