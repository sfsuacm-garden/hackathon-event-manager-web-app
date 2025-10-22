import { requireAuth, requireEvent, requireEventAccess } from '../../common/common.middleware';
import { t } from '../../core/trpc';
import { createOrUpdateApplication, getMyApplication } from './application.controller';
import { applicationCreateSchema } from './application.schemas';

export const applicationRouter = t.router({
  createOrUpdate: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .input(applicationCreateSchema)
    .mutation(({ ctx, input }) => createOrUpdateApplication(ctx.user?.id || "", ctx.event.id, input)),

  me: t.procedure.use(requireEventAccess).query(({ ctx }) => getMyApplication(ctx))
});
