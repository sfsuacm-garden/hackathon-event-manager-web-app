import { z } from 'zod';

export const ProfilesScalarFieldEnumSchema = z.enum(['id', 'email', 'full_name', 'role', 'created_at'])

export type ProfilesScalarFieldEnum = z.infer<typeof ProfilesScalarFieldEnumSchema>;