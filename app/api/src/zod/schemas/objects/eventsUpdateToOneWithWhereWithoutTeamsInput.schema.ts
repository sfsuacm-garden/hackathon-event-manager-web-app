import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsUpdateWithoutTeamsInputObjectSchema } from './eventsUpdateWithoutTeamsInput.schema';
import { eventsUncheckedUpdateWithoutTeamsInputObjectSchema } from './eventsUncheckedUpdateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => eventsUpdateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutTeamsInputObjectSchema)])
}).strict();
export const eventsUpdateToOneWithWhereWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutTeamsInput>;
export const eventsUpdateToOneWithWhereWithoutTeamsInputObjectZodSchema = makeSchema();
