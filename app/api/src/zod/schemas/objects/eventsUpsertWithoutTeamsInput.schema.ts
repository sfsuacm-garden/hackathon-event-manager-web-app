import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsUpdateWithoutTeamsInputObjectSchema } from './eventsUpdateWithoutTeamsInput.schema';
import { eventsUncheckedUpdateWithoutTeamsInputObjectSchema } from './eventsUncheckedUpdateWithoutTeamsInput.schema';
import { eventsCreateWithoutTeamsInputObjectSchema } from './eventsCreateWithoutTeamsInput.schema';
import { eventsUncheckedCreateWithoutTeamsInputObjectSchema } from './eventsUncheckedCreateWithoutTeamsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => eventsUpdateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutTeamsInputObjectSchema)]),
  create: z.union([z.lazy(() => eventsCreateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutTeamsInputObjectSchema)]),
  where: z.lazy(() => eventsWhereInputObjectSchema).optional()
}).strict();
export const eventsUpsertWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsUpsertWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpsertWithoutTeamsInput>;
export const eventsUpsertWithoutTeamsInputObjectZodSchema = makeSchema();
