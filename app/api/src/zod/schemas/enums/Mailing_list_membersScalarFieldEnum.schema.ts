import { z } from 'zod';

export const Mailing_list_membersScalarFieldEnumSchema = z.enum(['mailing_list_id', 'user_id'])

export type Mailing_list_membersScalarFieldEnum = z.infer<typeof Mailing_list_membersScalarFieldEnumSchema>;