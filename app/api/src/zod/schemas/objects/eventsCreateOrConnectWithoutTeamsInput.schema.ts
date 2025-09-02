import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsCreateWithoutTeamsInputObjectSchema } from './eventsCreateWithoutTeamsInput.schema';
import { eventsUncheckedCreateWithoutTeamsInputObjectSchema } from './eventsUncheckedCreateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => eventsCreateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutTeamsInputObjectSchema)])
}).strict();
export const eventsCreateOrConnectWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsCreateOrConnectWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateOrConnectWithoutTeamsInput>;
export const eventsCreateOrConnectWithoutTeamsInputObjectZodSchema = makeSchema();
