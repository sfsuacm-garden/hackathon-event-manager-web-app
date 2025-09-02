import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateNestedManyWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateNestedManyWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.date().nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersCreateNestedManyWithoutMailing_listsInputObjectSchema).optional()
}).strict();
export const mailing_listsCreateWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateWithoutEventsInput>;
export const mailing_listsCreateWithoutEventsInputObjectZodSchema = makeSchema();
