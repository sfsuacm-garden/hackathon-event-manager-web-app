import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { supabase } from '../config/supabase';
import type { User } from '@supabase/supabase-js';
import prisma from '../config/prismaClient';
import type { Event as PrismaEvent } from '@prisma/client';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  let user: User | null = null;
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    user = data?.user ?? null;
  }

  const eventId = req.headers['x-event-id'] as string | undefined;
  let event: PrismaEvent | null = null;
  if (eventId) {
    event = await prisma.event.findUnique({
      where: { id: eventId }
    });
  }

  return {
    req,
    res,
    user,
    event
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
