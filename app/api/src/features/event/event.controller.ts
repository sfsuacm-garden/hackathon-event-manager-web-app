import type { Request, Response } from "express";

import { z } from "zod";
import prisma from "../../config/prismaClient";
import { EventArgsObjectSchema, EventArgsObjectZodSchema, EventCreateInputObjectSchema, EventWhereUniqueInputObjectSchema } from "../../zod/schemas";


export async function getEvent(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Validate Prisma query arguments
    const where = EventWhereUniqueInputObjectSchema.parse({id})

    // Fetch event
    const event = await prisma.events.findUnique({where});

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