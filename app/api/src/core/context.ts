import type { User } from '@supabase/supabase-js';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import prisma from '../config/prismaClient';
import { supabase } from '../config/supabase';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  
  const authHeader = req.headers.authorization;
      
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  let user: User | null = null;

  if (token) {
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data?.user) {
        user = data.user;
      }
    } catch (err) {
      console.warn('Supabase auth error:', err);
    }
  }

  const eventId = req.headers['x-event-id'] as string | undefined;
  const event = eventId
    ? await prisma.event.findUnique({ where: { id: eventId } })
    : null;

  return {
    req,
    res,
    user,
    event
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;