import z from 'zod';

export const kickTeamMemberParamsSchema = z.object({
  memberKickingId: z.uuid(),
  memberBeingKickedId: z.uuid(),
  teamId: z.uuid()
});

export const teamIdUserIdParamsSchema = z.object({
  teamId: z.uuid(),
  userId: z.uuid(),
  eventId: z.uuid()
});