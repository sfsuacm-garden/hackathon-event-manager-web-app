import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateWithoutEventsInputObjectSchema } from './applicationsCreateWithoutEventsInput.schema';
import { applicationsUncheckedCreateWithoutEventsInputObjectSchema } from './applicationsUncheckedCreateWithoutEventsInput.schema';
import { applicationsCreateOrConnectWithoutEventsInputObjectSchema } from './applicationsCreateOrConnectWithoutEventsInput.schema';
import { applicationsUpsertWithWhereUniqueWithoutEventsInputObjectSchema } from './applicationsUpsertWithWhereUniqueWithoutEventsInput.schema';
import { applicationsCreateManyEventsInputEnvelopeObjectSchema } from './applicationsCreateManyEventsInputEnvelope.schema';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithWhereUniqueWithoutEventsInputObjectSchema } from './applicationsUpdateWithWhereUniqueWithoutEventsInput.schema';
import { applicationsUpdateManyWithWhereWithoutEventsInputObjectSchema } from './applicationsUpdateManyWithWhereWithoutEventsInput.schema';
import { applicationsScalarWhereInputObjectSchema } from './applicationsScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => applicationsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => applicationsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => applicationsUpsertWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => applicationsUpsertWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => applicationsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => applicationsUpdateWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => applicationsUpdateWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => applicationsUpdateManyWithWhereWithoutEventsInputObjectSchema), z.lazy(() => applicationsUpdateManyWithWhereWithoutEventsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => applicationsScalarWhereInputObjectSchema), z.lazy(() => applicationsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const applicationsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema: z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutEventsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutEventsNestedInput>;
export const applicationsUncheckedUpdateManyWithoutEventsNestedInputObjectZodSchema = makeSchema();
