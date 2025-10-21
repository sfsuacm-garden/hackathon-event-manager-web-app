import { requireAuth, requireEvent } from "../../common/common.middleware";
import { t } from "../../core/trpc";
import type { userProfileRouter } from "../userProfile/userProfile.routes";
import { getEventProfileById } from "./eventProfiles.controller";

export const eventProfileRouter = t.router({
     me: t.procedure.use(requireAuth)
         .use(requireEvent).query(async ({ ctx}) => {
        return await getEventProfileById(ctx.event.id, ctx.user?.id ?? "")
      }),
});

export type UserProfileRouter = typeof userProfileRouter;
