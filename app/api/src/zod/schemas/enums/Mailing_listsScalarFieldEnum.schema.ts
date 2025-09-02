import { z } from 'zod';

export const Mailing_listsScalarFieldEnumSchema = z.enum(['id', 'event_id', 'name', 'created_at'])

export type Mailing_listsScalarFieldEnum = z.infer<typeof Mailing_listsScalarFieldEnumSchema>;