import { Router } from "express";
import { initTRPC } from "@trpc/server";
import { idParamsSchema, teamIdUserIdParamsSchema } from "../../common/common.schema";
import { joinTeam, leaveTeam } from "./teams.controller";

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
    })
});

export type TeamsRouter = typeof teamsRouter;