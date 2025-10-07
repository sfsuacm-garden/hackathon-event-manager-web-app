import z from 'zod';
import {t} from '../../core/trpc';
import { teamProcedure, protectedProcedure } from '../../common/common.middleware';
import { idParamsSchema } from '../../common/common.schema';
import { getTeamById, joinTeam, kickTeamMember, leaveTeam } from './teams.controller';
import { kickTeamMemberParamsSchema, teamIdUserIdParamsSchema } from './teams.schemas';

// const teamsTRPC = initTRPC.create();

export const teamsRouter = t.router({
  getTeamById: protectedProcedure
    .input(idParamsSchema)
    .query(async ({ input }) => {
      return await getTeamById(input.id);
    }),

  getOwnTeam: teamProcedure
    .query(async ({ctx}) => {
      return await getTeamById(ctx.teamId);
    }),

  joinTeamById: teamProcedure
    .input(idParamsSchema)
    .mutation(async ({ ctx, input }) => {
      return await joinTeam(input.id, ctx.user.id, ctx.event?.id!);
    }),

  leaveTeamById: teamProcedure
    .mutation(async ({ ctx }) => {
      return await leaveTeam(ctx.teamId, ctx.user.id);
    }),
  
  kickTeamMemberById: teamProcedure
    .input(z.object({memberBeingKickedId: z.uuid()}))
    .mutation(async ({ ctx, input }) => {
      return await kickTeamMember(ctx.user.id, input.memberBeingKickedId, ctx.teamId);
    })
});

export type TeamsRouter = typeof teamsRouter;