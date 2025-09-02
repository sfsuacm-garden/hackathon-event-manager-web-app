import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateWithoutEventsInputObjectSchema } from './mailing_listsCreateWithoutEventsInput.schema';
import { mailing_listsUncheckedCreateWithoutEventsInputObjectSchema } from './mailing_listsUncheckedCreateWithoutEventsInput.schema';
import { mailing_listsCreateOrConnectWithoutEventsInputObjectSchema } from './mailing_listsCreateOrConnectWithoutEventsInput.schema';
import { mailing_listsUpsertWithWhereUniqueWithoutEventsInputObjectSchema } from './mailing_listsUpsertWithWhereUniqueWithoutEventsInput.schema';
import { mailing_listsCreateManyEventsInputEnvelopeObjectSchema } from './mailing_listsCreateManyEventsInputEnvelope.schema';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsUpdateWithWhereUniqueWithoutEventsInputObjectSchema } from './mailing_listsUpdateWithWhereUniqueWithoutEventsInput.schema';
import { mailing_listsUpdateManyWithWhereWithoutEventsInputObjectSchema } from './mailing_listsUpdateManyWithWhereWithoutEventsInput.schema';
import { mailing_listsScalarWhereInputObjectSchema } from './mailing_listsScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_listsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => mailing_listsUpsertWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUpsertWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_listsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => mailing_listsWhereUniqueInputObjectSchema), z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => mailing_listsWhereUniqueInputObjectSchema), z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => mailing_listsWhereUniqueInputObjectSchema), z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => mailing_listsWhereUniqueInputObjectSchema), z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => mailing_listsUpdateWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUpdateWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => mailing_listsUpdateManyWithWhereWithoutEventsInputObjectSchema), z.lazy(() => mailing_listsUpdateManyWithWhereWithoutEventsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => mailing_listsScalarWhereInputObjectSchema), z.lazy(() => mailing_listsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const mailing_listsUpdateManyWithoutEventsNestedInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateManyWithoutEventsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateManyWithoutEventsNestedInput>;
export const mailing_listsUpdateManyWithoutEventsNestedInputObjectZodSchema = makeSchema();
