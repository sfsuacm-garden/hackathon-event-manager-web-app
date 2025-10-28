import { requireAuth, requireEvent } from '../../common/common.middleware';
import { t } from '../../core/trpc';
import type { userProfileRouter } from '../userProfile/userProfile.routes';
import { meEventProfileSchema } from './eventProfile.schemas';
import { getEventProfileById } from './eventProfiles.controller';

export const eventProfileRouter = t.router({
  me: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .input(meEventProfileSchema)
    .query(async ({ ctx, input }) => {
      return await getEventProfileById(ctx.user?.id ?? '', ctx.event.id, input.includeUserProfile);
    })
});

export type UserProfileRouter = typeof userProfileRouter;
