import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateWithoutEventsInputObjectSchema } from './teamsCreateWithoutEventsInput.schema';
import { teamsUncheckedCreateWithoutEventsInputObjectSchema } from './teamsUncheckedCreateWithoutEventsInput.schema';
import { teamsCreateOrConnectWithoutEventsInputObjectSchema } from './teamsCreateOrConnectWithoutEventsInput.schema';
import { teamsUpsertWithWhereUniqueWithoutEventsInputObjectSchema } from './teamsUpsertWithWhereUniqueWithoutEventsInput.schema';
import { teamsCreateManyEventsInputEnvelopeObjectSchema } from './teamsCreateManyEventsInputEnvelope.schema';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsUpdateWithWhereUniqueWithoutEventsInputObjectSchema } from './teamsUpdateWithWhereUniqueWithoutEventsInput.schema';
import { teamsUpdateManyWithWhereWithoutEventsInputObjectSchema } from './teamsUpdateManyWithWhereWithoutEventsInput.schema';
import { teamsScalarWhereInputObjectSchema } from './teamsScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => teamsCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => teamsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => teamsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => teamsUpsertWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => teamsUpsertWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => teamsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => teamsWhereUniqueInputObjectSchema), z.lazy(() => teamsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => teamsWhereUniqueInputObjectSchema), z.lazy(() => teamsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => teamsWhereUniqueInputObjectSchema), z.lazy(() => teamsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => teamsWhereUniqueInputObjectSchema), z.lazy(() => teamsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => teamsUpdateWithWhereUniqueWithoutEventsInputObjectSchema), z.lazy(() => teamsUpdateWithWhereUniqueWithoutEventsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => teamsUpdateManyWithWhereWithoutEventsInputObjectSchema), z.lazy(() => teamsUpdateManyWithWhereWithoutEventsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => teamsScalarWhereInputObjectSchema), z.lazy(() => teamsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const teamsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema: z.ZodType<Prisma.teamsUncheckedUpdateManyWithoutEventsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedUpdateManyWithoutEventsNestedInput>;
export const teamsUncheckedUpdateManyWithoutEventsNestedInputObjectZodSchema = makeSchema();
