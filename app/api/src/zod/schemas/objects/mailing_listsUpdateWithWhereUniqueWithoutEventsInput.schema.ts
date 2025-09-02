import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsUpdateWithoutEventsInputObjectSchema } from './mailing_listsUpdateWithoutEventsInput.schema';
import { mailing_listsUncheckedUpdateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedUpdateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => mailing_listsUpdateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateWithoutEventsInputObjectSchema)])
}).strict();
export const mailing_listsUpdateWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateWithWhereUniqueWithoutEventsInput>;
export const mailing_listsUpdateWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
