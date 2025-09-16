import { Router } from "express";
import {  getEventById, getEventsByQuery } from "./event.controller";
import { idParamsSchema } from "../../common/common.schema";
import { initTRPC } from "@trpc/server";
import { getEventsByQuerySchema } from "./event.schemas";


const t = initTRPC.create();

export const eventRouter = t.router({
  // GET /:id -> getById procedure
  getById: t.procedure
    .input(idParamsSchema)
    .query(async ({ input }) => {
      return await getEventById(input.id);
    }),

  // GET / -> getByQuery procedure  
  getByQuery: t.procedure
    .input(getEventsByQuerySchema)
    .query(async ({ input }) => {
      return await getEventsByQuery(input);
    }),
});


export type EventRouter = typeof eventRouter;