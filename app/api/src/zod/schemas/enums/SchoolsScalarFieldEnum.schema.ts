import { z } from 'zod';

export const SchoolsScalarFieldEnumSchema = z.enum(['id', 'name', 'email_domain', 'country_code', 'created_at'])

export type SchoolsScalarFieldEnum = z.infer<typeof SchoolsScalarFieldEnumSchema>;