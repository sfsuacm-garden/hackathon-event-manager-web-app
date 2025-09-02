import { z } from 'zod';

export const Team_membersScalarFieldEnumSchema = z.enum(['team_id', 'user_id', 'is_admin', 'joined_at'])

export type Team_membersScalarFieldEnum = z.infer<typeof Team_membersScalarFieldEnumSchema>;