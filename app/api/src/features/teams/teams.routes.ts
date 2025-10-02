import { Router } from 'express';
import { initTRPC } from '@trpc/server';
import { idParamsSchema } from '../../common/common.schema';
import { getTeamById, joinTeam, kickTeamMember, leaveTeam } from './teams.controller';
import { kickTeamMemberParamsSchema, teamIdUserIdParamsSchema } from './teams.schemas';

const teamsTRPC = initTRPC.create();

export const teamsRouter = teamsTRPC.router({
  getTeamById: teamsTRPC.procedure
    .input(idParamsSchema)
    .query(async ({ input }) => {
      return await getTeamById(input.id);
    }),

  joinTeamById: teamsTRPC.procedure
    .input(teamIdUserIdParamsSchema)
    .mutation(async ({ input }) => {
      return await joinTeam(input.teamId, input.userId, input.eventId);
    }),

  leaveTeamById: teamsTRPC.procedure
    .input(teamIdUserIdParamsSchema)
    .mutation(async ({ input }) => {
      return await leaveTeam(input.teamId, input.userId);
    }),
  
  kickTeamMemberById: teamsTRPC.procedure
    .input(kickTeamMemberParamsSchema)
    .mutation(async ({ input }) => {
      return await kickTeamMember(input.memberKickingId, input.memberBeingKickedId, input.teamId);
    })
});

export type TeamsRouter = typeof teamsRouter;