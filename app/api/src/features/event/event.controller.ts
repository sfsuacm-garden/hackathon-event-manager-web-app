import type { Request, Response } from "express";

import { z } from "zod";
import prisma from "../../config/prismaClient";
import { eventsWhereUniqueInputObjectSchema } from "../../zod/schemas/objects/eventsWhereUniqueInput.schema";
import { eventsArgsObjectSchema, eventsArgsObjectZodSchema } from "../../zod/schemas/objects/eventsArgs.schema";
import { eventsCreateInputObjectSchema, eventsCreateInputObjectZodSchema } from "../../zod/schemas/objects/eventsCreateInput.schema";

export async function getEvent(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Validate Prisma query arguments
    const where = eventsWhereUniqueInputObjectSchema.parse({ id })

    // Fetch event
    const event = await prisma.events.findUnique({where});

    if (!event) return res.status(404).json({ error: "Event not found" });

    // Validate output before sending
    const validatedEvent = eventsArgsObjectZodSchema.parse(event)
    res.json(validatedEvent);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    
    //Validate response body.
    eventsCreateInputObjectZodSchema.parse(req.body);
    
     const event = await prisma.events.create({ 
      data: req.body
    });

    
    const validatedEvent = eventsArgsObjectSchema.parse(event)
    res.status(201).json(event);
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      // Zod validation errors
      return res.status(400).json({ error: (err as any).errors });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}