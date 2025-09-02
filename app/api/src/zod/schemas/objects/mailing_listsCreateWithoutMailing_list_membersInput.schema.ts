import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateNestedOneWithoutMailing_listsInputObjectSchema } from './eventsCreateNestedOneWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.date().nullish(),
  events: z.lazy(() => eventsCreateNestedOneWithoutMailing_listsInputObjectSchema).optional()
}).strict();
export const mailing_listsCreateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateWithoutMailing_list_membersInput>;
export const mailing_listsCreateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
