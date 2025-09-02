import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsScalarWhereInputObjectSchema } from './mailing_listsScalarWhereInput.schema';
import { mailing_listsUpdateManyMutationInputObjectSchema } from './mailing_listsUpdateManyMutationInput.schema';
import { mailing_listsUncheckedUpdateManyWithoutEventsInputObjectSchema } from './mailing_listsUncheckedUpdateManyWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => mailing_listsUpdateManyMutationInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateManyWithoutEventsInputObjectSchema)])
}).strict();
export const mailing_listsUpdateManyWithWhereWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateManyWithWhereWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateManyWithWhereWithoutEventsInput>;
export const mailing_listsUpdateManyWithWhereWithoutEventsInputObjectZodSchema = makeSchema();
