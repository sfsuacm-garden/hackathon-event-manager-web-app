import z from "zod";

export const kickTeamMemberParamsSchema = z.object({
  memberKickingId: z.uuid(),
  memberBeingKickedId: z.uuid(),
  teamId: z.uuid()
});