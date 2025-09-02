import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateNestedManyWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateNestedManyWithoutMailing_listsInput.schema';
import { eventsCreateNestedOneWithoutMailing_listsInputObjectSchema } from './eventsCreateNestedOneWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.date().nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersCreateNestedManyWithoutMailing_listsInputObjectSchema).optional(),
  events: z.lazy(() => eventsCreateNestedOneWithoutMailing_listsInputObjectSchema).optional()
}).strict();
export const mailing_listsCreateInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateInput>;
export const mailing_listsCreateInputObjectZodSchema = makeSchema();
