import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutApplicationsInputObjectSchema } from './eventsCreateWithoutApplicationsInput.schema';
import { eventsUncheckedCreateWithoutApplicationsInputObjectSchema } from './eventsUncheckedCreateWithoutApplicationsInput.schema';
import { eventsCreateOrConnectWithoutApplicationsInputObjectSchema } from './eventsCreateOrConnectWithoutApplicationsInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional()
}).strict();
export const eventsCreateNestedOneWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.eventsCreateNestedOneWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateNestedOneWithoutApplicationsInput>;
export const eventsCreateNestedOneWithoutApplicationsInputObjectZodSchema = makeSchema();
