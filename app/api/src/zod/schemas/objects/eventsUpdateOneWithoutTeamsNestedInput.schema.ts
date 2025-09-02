import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutTeamsInputObjectSchema } from './eventsCreateWithoutTeamsInput.schema';
import { eventsUncheckedCreateWithoutTeamsInputObjectSchema } from './eventsUncheckedCreateWithoutTeamsInput.schema';
import { eventsCreateOrConnectWithoutTeamsInputObjectSchema } from './eventsCreateOrConnectWithoutTeamsInput.schema';
import { eventsUpsertWithoutTeamsInputObjectSchema } from './eventsUpsertWithoutTeamsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsUpdateToOneWithWhereWithoutTeamsInputObjectSchema } from './eventsUpdateToOneWithWhereWithoutTeamsInput.schema';
import { eventsUpdateWithoutTeamsInputObjectSchema } from './eventsUpdateWithoutTeamsInput.schema';
import { eventsUncheckedUpdateWithoutTeamsInputObjectSchema } from './eventsUncheckedUpdateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutTeamsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutTeamsInputObjectSchema).optional(),
  upsert: z.lazy(() => eventsUpsertWithoutTeamsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => eventsUpdateToOneWithWhereWithoutTeamsInputObjectSchema), z.lazy(() => eventsUpdateWithoutTeamsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutTeamsInputObjectSchema)]).optional()
}).strict();
export const eventsUpdateOneWithoutTeamsNestedInputObjectSchema: z.ZodType<Prisma.eventsUpdateOneWithoutTeamsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateOneWithoutTeamsNestedInput>;
export const eventsUpdateOneWithoutTeamsNestedInputObjectZodSchema = makeSchema();
