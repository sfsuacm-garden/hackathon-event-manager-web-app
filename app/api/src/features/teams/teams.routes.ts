import { Router } from 'express';
import { initTRPC } from '@trpc/server';
import { idParamsSchema, teamIdUserIdParamsSchema } from '../../common/common.schema';
import { getTeamById, joinTeam, kickTeamMember, leaveTeam } from './teams.controller';
import { kickTeamMemberParamsSchema } from './teams.schemas';

const teamsTRPC = initTRPC.create();

export const teamsRouter = teamsTRPC.router({
  getTeamById: teamsTRPC.procedure
    .input(idParamsSchema)
    .query(async ({ input }) => {
      return await getTeamById(input.id);
    }),

  joinTeamById: teamsTRPC.procedure
    .input(teamIdUserIdParamsSchema)
    .query(async ({ input }) => {
      return await joinTeam(input.teamId, input.userId);
    }),

  leaveTeamById: teamsTRPC.procedure
    .input(teamIdUserIdParamsSchema)
    .query(async ({ input }) => {
      return await leaveTeam(input.teamId, input.userId);
    }),
  
  kickTeamMemberById: teamsTRPC.procedure
    .input(kickTeamMemberParamsSchema)
    .query(async ({ input }) => {
      return await kickTeamMember(input.memberKickingId, input.memberBeingKickedId, input.teamId);
    })
});

export type TeamsRouter = typeof teamsRouter;