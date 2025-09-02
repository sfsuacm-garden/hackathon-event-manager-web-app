import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsUpdateWithoutEventsInputObjectSchema } from './mailing_listsUpdateWithoutEventsInput.schema';
import { mailing_listsUncheckedUpdateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedUpdateWithoutEventsInput.schema';
import { mailing_listsCreateWithoutEventsInputObjectSchema } from './mailing_listsCreateWithoutEventsInput.schema';
import { mailing_listsUncheckedCreateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => mailing_listsUpdateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateWithoutEventsInputObjectSchema)]),
  create: z.union([z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const mailing_listsUpsertWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUpsertWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpsertWithWhereUniqueWithoutEventsInput>;
export const mailing_listsUpsertWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
