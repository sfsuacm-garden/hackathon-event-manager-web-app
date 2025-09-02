import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema } from './mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInput.schema';
import { profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema } from './profilesUpdateOneRequiredWithoutMailing_list_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_lists: z.lazy(() => mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema).optional(),
  profiles: z.lazy(() => profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema).optional()
}).strict();
export const mailing_list_membersUpdateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateInput>;
export const mailing_list_membersUpdateInputObjectZodSchema = makeSchema();
