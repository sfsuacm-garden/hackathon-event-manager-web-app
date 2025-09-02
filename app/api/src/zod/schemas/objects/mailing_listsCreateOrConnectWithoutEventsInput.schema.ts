import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsCreateWithoutEventsInputObjectSchema } from './mailing_listsCreateWithoutEventsInput.schema';
import { mailing_listsUncheckedCreateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const mailing_listsCreateOrConnectWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateOrConnectWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateOrConnectWithoutEventsInput>;
export const mailing_listsCreateOrConnectWithoutEventsInputObjectZodSchema = makeSchema();
