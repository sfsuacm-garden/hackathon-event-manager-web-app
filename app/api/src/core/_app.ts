import { applicationRouter } from '../features/application/application.routes';
import { eventRouter } from '../features/event/event.routes';
import { schoolsRouter } from '../features/schools/schools.routes';
import { t } from './trpc';

export const trpcRouter = t.router({
  //TODO change event directory to be plural.
  events: eventRouter,
  applications: applicationRouter,
  schools: schoolsRouter
});

export type AppRouter = typeof trpcRouter;
