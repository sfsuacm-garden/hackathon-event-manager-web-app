import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema } from './profilesUpdateOneRequiredWithoutMailing_list_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  profiles: z.lazy(() => profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema).optional()
}).strict();
export const mailing_list_membersUpdateWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateWithoutMailing_listsInput>;
export const mailing_list_membersUpdateWithoutMailing_listsInputObjectZodSchema = makeSchema();
