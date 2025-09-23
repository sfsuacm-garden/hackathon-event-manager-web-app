import type { Request, Response } from 'express';

import { z } from 'zod';
import prisma from '../../config/prismaClient';
import { EventArgsObjectSchema, EventWhereUniqueInputObjectSchema } from '../../zod/schemas';
import { type GetEventsQuerySchema } from './event.schemas';
import { idParamsSchema } from '../../common/common.schema';
import { TRPCError } from '@trpc/server';

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Event with ID ${id} not found`
      });
    }
    return event;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}

export async function getEventsByQuery(query: GetEventsQuerySchema) {
  try {
    const events = await prisma.event.findMany({
      where: query.where,
      skip: query.pagination.offset,
      take: query.pagination.limit,
      orderBy: { createdAt: 'desc' }
    });
    return events;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}
