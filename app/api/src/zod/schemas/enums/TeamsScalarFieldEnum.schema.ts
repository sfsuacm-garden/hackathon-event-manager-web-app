import { z } from 'zod';

export const TeamsScalarFieldEnumSchema = z.enum(['id', 'event_id', 'name', 'created_at'])

export type TeamsScalarFieldEnum = z.infer<typeof TeamsScalarFieldEnumSchema>;