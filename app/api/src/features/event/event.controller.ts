import type { Request, Response } from "express";

import { z } from "zod";
import prisma from "../../config/prismaClient";
import { EventArgsObjectSchema, EventWhereUniqueInputObjectSchema } from "../../zod/schemas";
import { listEventsQuerySchema } from "./event.schemas";
import { idParamsSchema } from "../../common/common.schema";


export async function getEventById(req: Request, res: Response) {
  try {
    // Validate Prisma query arguments
     const { id } = idParamsSchema.parse(req.params);

    // Fetch event
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) return res.status(404).json({ error: "Event not found" });

    // Validate output before sending
    const validatedEvent = EventArgsObjectSchema.parse(event)
    res.json(validatedEvent);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getEventsByQuery(req: Request, res: Response) {

  try {
  const {where, pagination} = listEventsQuerySchema.parse(req.query);
  const events = await prisma.event.findMany({ where, skip: pagination.offset, take: pagination.limit,  orderBy: { createdAt: "desc" } });
  res.json(events);
  } catch (err) {
     if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }                                    
}

      


  