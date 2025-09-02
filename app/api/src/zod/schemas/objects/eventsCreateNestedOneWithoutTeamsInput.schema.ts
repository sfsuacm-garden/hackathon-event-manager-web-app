import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutTeamsInputObjectSchema } from './eventsCreateWithoutTeamsInput.schema';
import { eventsUncheckedCreateWithoutTeamsInputObjectSchema } from './eventsUncheckedCreateWithoutTeamsInput.schema';
import { eventsCreateOrConnectWithoutTeamsInputObjectSchema } from './eventsCreateOrConnectWithoutTeamsInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutTeamsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutTeamsInputObjectSchema).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional()
}).strict();
export const eventsCreateNestedOneWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsCreateNestedOneWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateNestedOneWithoutTeamsInput>;
export const eventsCreateNestedOneWithoutTeamsInputObjectZodSchema = makeSchema();
