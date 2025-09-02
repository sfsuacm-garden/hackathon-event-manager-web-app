import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateWithoutEventsInputObjectSchema } from './teamsCreateWithoutEventsInput.schema';
import { teamsUncheckedCreateWithoutEventsInputObjectSchema } from './teamsUncheckedCreateWithoutEventsInput.schema';
import { teamsCreateOrConnectWithoutEventsInputObjectSchema } from './teamsCreateOrConnectWithoutEventsInput.schema';
import { teamsCreateManyEventsInputEnvelopeObjectSchema } from './teamsCreateManyEventsInputEnvelope.schema';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => teamsCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsCreateWithoutEventsInputObjectSchema).array(), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => teamsCreateOrConnectWithoutEventsInputObjectSchema), z.lazy(() => teamsCreateOrConnectWithoutEventsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => teamsCreateManyEventsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => teamsWhereUniqueInputObjectSchema), z.lazy(() => teamsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const teamsCreateNestedManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsCreateNestedManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateNestedManyWithoutEventsInput>;
export const teamsCreateNestedManyWithoutEventsInputObjectZodSchema = makeSchema();
