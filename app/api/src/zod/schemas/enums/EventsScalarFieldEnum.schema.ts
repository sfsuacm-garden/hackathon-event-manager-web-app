import { z } from 'zod';

export const EventsScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'start_date', 'end_date', 'created_at', 'is_event_live', 'is_team_managment_open'])

export type EventsScalarFieldEnum = z.infer<typeof EventsScalarFieldEnumSchema>;