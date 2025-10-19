import { applicationRouter } from '../features/application/application.routes';
import { eventRouter } from '../features/event/event.routes';
import { schoolsRouter } from '../features/schools/schools.routes';
import { userProfileRouter } from '../features/userProfile/userProfile.routes';
import { t } from './trpc';

export const trpcRouter = t.router({
  //TODO change event directory to be plural.
  events: eventRouter,
  applications: applicationRouter,
  schools: schoolsRouter,
  profile: userProfileRouter
});

export type AppRouter = typeof trpcRouter;
