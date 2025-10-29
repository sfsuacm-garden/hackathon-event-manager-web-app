import z from 'zod';
import { DEFAULT_QUERY_LIMIT_SMALL } from '../../common/constants';
import { paginationSchema } from '../../common/common.schema';
import { clean } from '../../common/clean';
import type { Pagination } from '@supabase/supabase-js';

export const getEventsByQuerySchema = paginationSchema
  .extend({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    start_date: z
      .string()
      .transform((val) => (val ? new Date(val) : null))
      .optional(),
    end_date: z
      .string()
      .transform((val) => (val ? new Date(val) : null))
      .optional(),
    created_at: z
      .string()
      .transform((val) => (val ? new Date(val) : null))
      .optional(),
    is_event_live: z
      .string()
      .transform((val) => (val === 'true' ? true : val === 'false' ? false : null))
      .optional(),
    is_team_managment_open: z
      .string()
      .transform((val) => (val === 'true' ? true : val === 'false' ? false : null))
      .optional()
  })
  .transform((data) => {
    // Build Prisma `where` dynamically, only include defined keys
    const where: Record<string, any> = {};

    if (data.id) where.id = data.id;
    if (data.name) where.name = { contains: data.name, mode: 'insensitive' };
    if (data.description) where.description = { contains: data.description, mode: 'insensitive' };
    if (data.start_date) where.startDate = data.start_date;
    if (data.end_date) where.endDate = data.end_date;
    if (data.created_at) where.CreatedAt = data.created_at;
    if (data.is_event_live !== undefined) where.isEventLive = data.is_event_live;
    if (data.is_team_managment_open !== undefined)
      where.isTeamManagementOpen = data.is_team_managment_open;

    return {
      where,
      pagination: { limit: data.limit, offset: data.offset }
    };
  });

export type GetEventsQuerySchema = z.infer<typeof getEventsByQuerySchema>;
