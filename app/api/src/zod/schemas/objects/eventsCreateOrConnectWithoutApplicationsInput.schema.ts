import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsCreateWithoutApplicationsInputObjectSchema } from './eventsCreateWithoutApplicationsInput.schema';
import { eventsUncheckedCreateWithoutApplicationsInputObjectSchema } from './eventsUncheckedCreateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => eventsCreateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutApplicationsInputObjectSchema)])
}).strict();
export const eventsCreateOrConnectWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.eventsCreateOrConnectWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateOrConnectWithoutApplicationsInput>;
export const eventsCreateOrConnectWithoutApplicationsInputObjectZodSchema = makeSchema();
