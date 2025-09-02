import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsUpdateWithoutApplicationsInputObjectSchema } from './eventsUpdateWithoutApplicationsInput.schema';
import { eventsUncheckedUpdateWithoutApplicationsInputObjectSchema } from './eventsUncheckedUpdateWithoutApplicationsInput.schema';
import { eventsCreateWithoutApplicationsInputObjectSchema } from './eventsCreateWithoutApplicationsInput.schema';
import { eventsUncheckedCreateWithoutApplicationsInputObjectSchema } from './eventsUncheckedCreateWithoutApplicationsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => eventsUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutApplicationsInputObjectSchema)]),
  create: z.union([z.lazy(() => eventsCreateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutApplicationsInputObjectSchema)]),
  where: z.lazy(() => eventsWhereInputObjectSchema).optional()
}).strict();
export const eventsUpsertWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.eventsUpsertWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpsertWithoutApplicationsInput>;
export const eventsUpsertWithoutApplicationsInputObjectZodSchema = makeSchema();
