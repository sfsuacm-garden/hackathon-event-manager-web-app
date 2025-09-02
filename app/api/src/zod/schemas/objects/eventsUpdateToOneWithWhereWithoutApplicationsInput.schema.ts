import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsUpdateWithoutApplicationsInputObjectSchema } from './eventsUpdateWithoutApplicationsInput.schema';
import { eventsUncheckedUpdateWithoutApplicationsInputObjectSchema } from './eventsUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => eventsUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutApplicationsInputObjectSchema)])
}).strict();
export const eventsUpdateToOneWithWhereWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutApplicationsInput>;
export const eventsUpdateToOneWithWhereWithoutApplicationsInputObjectZodSchema = makeSchema();
