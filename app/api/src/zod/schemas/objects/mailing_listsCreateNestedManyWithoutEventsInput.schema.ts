import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateWithoutEventsInputObjectSchema } from './mailing_listsCreateWithoutEventsInput.schema';
import { mailing_listsUncheckedCreateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedCreateWithoutEventsInput.schema';
import { mailing_listsCreateOrConnectWithoutEventsInputObjectSchema } from './mailing_listsCreateOrConnectWithoutEventsInput.schema';
import { mailing_listsCreateManyEventsInputEnvelopeObjectSchema } from './mailing_listsCreateManyEventsInputEnvelope.schema';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_listsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_listsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => mailing_listsWhereUniqueInputObjectSchema), z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const mailing_listsCreateNestedManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateNestedManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateNestedManyWithoutEventsInput>;
export const mailing_listsCreateNestedManyWithoutEventsInputObjectZodSchema = makeSchema();
