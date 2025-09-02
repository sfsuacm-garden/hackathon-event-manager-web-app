import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.date().nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInputObjectSchema).optional()
}).strict();
export const mailing_listsUncheckedCreateWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedCreateWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedCreateWithoutEventsInput>;
export const mailing_listsUncheckedCreateWithoutEventsInputObjectZodSchema = makeSchema();
