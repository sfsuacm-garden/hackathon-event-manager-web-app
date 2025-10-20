import { requireAuth } from '../../common/common.middleware';
import { t } from '../../core/trpc';
import { UserProfileCreateInputObjectSchema } from '../../zod/schemas';
import { createUserProfile } from './userProfile.controller';

export const userProfileRouter = t.router({
  create: t.procedure
    .use(requireAuth)
    .input(UserProfileCreateInputObjectSchema.omit({ id: true })) // client doesn't supply id
    .mutation(async ({ input, ctx }) => {
      // Set the id to the authenticated user's id
      const profileData = {
        ...input,
        id: ctx.user.id
      };

      return await createUserProfile(profileData);
    })
});

export type UserProfileRouter = typeof userProfileRouter;
