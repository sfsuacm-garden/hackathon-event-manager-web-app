import z from 'zod';
import { protectedProcedure, teamProcedure } from '../../common/common.middleware';
import { idParamsSchema } from '../../common/common.schema';
import { t } from '../../core/trpc';
import { getTeamById, joinTeam, kickTeamMember, leaveTeam, getOrCreateJoinTeamToken, getTeamFromTeamToken } from './teams.controller';

export const teamsRouter = t.router({
  getTeamById: protectedProcedure
    .input(idParamsSchema)
    .query(async ({ input }) => {
      return await getTeamById(input.id);
    }),

  getOwnTeam: teamProcedure
    .query(async ({ctx}) => {
      return {
        team: await getTeamById(ctx.teamId),
        isTeamAdmin: ctx.isTeamAdmin,
        requestorUserId: ctx.user.id
      }
    }),

  getTeamInviteToken: teamProcedure
    .query(async ({ctx}) => {
      return await getOrCreateJoinTeamToken(ctx.teamId);
    }),

  joinTeamById: teamProcedure
    .input(z.object({teamToken: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const teamId = await getTeamFromTeamToken(input.teamToken);
      return await joinTeam(teamId, ctx.user.id, ctx.event?.id!);
    }),

  leaveTeam: teamProcedure
    .mutation(async ({ ctx }) => {
      return await leaveTeam(ctx.teamId, ctx.user.id);
    }),
  
  kickTeamMemberById: teamProcedure
    .input(z.object({memberBeingKickedId: z.uuid()}))
    .mutation(async ({ ctx, input }) => {
      // memberBeingKickedId should also be a userId
      return await kickTeamMember(ctx.user.id, input.memberBeingKickedId, ctx.teamId);
    })
});

export type TeamsRouter = typeof teamsRouter;