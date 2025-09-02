import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema } from './mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_lists: z.lazy(() => mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema).optional()
}).strict();
export const mailing_list_membersUpdateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateWithoutProfilesInput>;
export const mailing_list_membersUpdateWithoutProfilesInputObjectZodSchema = makeSchema();
