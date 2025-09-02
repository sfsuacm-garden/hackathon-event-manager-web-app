import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateWithoutEventsInputObjectSchema } from './applicationsCreateWithoutEventsInput.schema';
import { applicationsUncheckedCreateWithoutEventsInputObjectSchema } from './applicationsUncheckedCreateWithoutEventsInput.schema';
import { applicationsCreateOrConnectWithoutEventsInputObjectSchema } from './applicationsCreateOrConnectWithoutEventsInput.schema';
import { applicationsCreateManyEventsInputEnvelopeObjectSchema } from './applicationsCreateManyEventsInputEnvelope.schema';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => applicationsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => applicationsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => applicationsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const applicationsCreateNestedManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsCreateNestedManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateNestedManyWithoutEventsInput>;
export const applicationsCreateNestedManyWithoutEventsInputObjectZodSchema = makeSchema();
