import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutApplicationsInputObjectSchema } from './eventsCreateWithoutApplicationsInput.schema';
import { eventsUncheckedCreateWithoutApplicationsInputObjectSchema } from './eventsUncheckedCreateWithoutApplicationsInput.schema';
import { eventsCreateOrConnectWithoutApplicationsInputObjectSchema } from './eventsCreateOrConnectWithoutApplicationsInput.schema';
import { eventsUpsertWithoutApplicationsInputObjectSchema } from './eventsUpsertWithoutApplicationsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsUpdateToOneWithWhereWithoutApplicationsInputObjectSchema } from './eventsUpdateToOneWithWhereWithoutApplicationsInput.schema';
import { eventsUpdateWithoutApplicationsInputObjectSchema } from './eventsUpdateWithoutApplicationsInput.schema';
import { eventsUncheckedUpdateWithoutApplicationsInputObjectSchema } from './eventsUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  upsert: z.lazy(() => eventsUpsertWithoutApplicationsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => eventsUpdateToOneWithWhereWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutApplicationsInputObjectSchema)]).optional()
}).strict();
export const eventsUpdateOneWithoutApplicationsNestedInputObjectSchema: z.ZodType<Prisma.eventsUpdateOneWithoutApplicationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateOneWithoutApplicationsNestedInput>;
export const eventsUpdateOneWithoutApplicationsNestedInputObjectZodSchema = makeSchema();
