import { requireAuth, requireEvent, requireEventAccess } from '../../common/common.middleware';
import { t } from '../../core/trpc';
import { checkInSchema, checkInLookupSchema } from './checkIn.schemas';
import { checkInUserById, lookupCheckInByUserId } from './checkIn.controller';

export const checkInRouter = t.router({
  lookup: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .use(requireEventAccess)
    .input(checkInLookupSchema)
    .query(({ ctx, input }) =>
      lookupCheckInByUserId(ctx.event.id, input.userId)
    ),

  checkIn: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .use(requireEventAccess)
    .input(checkInSchema)
    .mutation(({ ctx, input }) =>
      checkInUserById(ctx.event.id, ctx.user?.id || '', input.userId)
    )
});