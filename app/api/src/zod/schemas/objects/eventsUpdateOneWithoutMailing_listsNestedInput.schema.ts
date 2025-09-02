import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutMailing_listsInputObjectSchema } from './eventsCreateWithoutMailing_listsInput.schema';
import { eventsUncheckedCreateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedCreateWithoutMailing_listsInput.schema';
import { eventsCreateOrConnectWithoutMailing_listsInputObjectSchema } from './eventsCreateOrConnectWithoutMailing_listsInput.schema';
import { eventsUpsertWithoutMailing_listsInputObjectSchema } from './eventsUpsertWithoutMailing_listsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsUpdateToOneWithWhereWithoutMailing_listsInputObjectSchema } from './eventsUpdateToOneWithWhereWithoutMailing_listsInput.schema';
import { eventsUpdateWithoutMailing_listsInputObjectSchema } from './eventsUpdateWithoutMailing_listsInput.schema';
import { eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedUpdateWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutMailing_listsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutMailing_listsInputObjectSchema).optional(),
  upsert: z.lazy(() => eventsUpsertWithoutMailing_listsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => eventsWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => eventsUpdateToOneWithWhereWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUpdateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema)]).optional()
}).strict();
export const eventsUpdateOneWithoutMailing_listsNestedInputObjectSchema: z.ZodType<Prisma.eventsUpdateOneWithoutMailing_listsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateOneWithoutMailing_listsNestedInput>;
export const eventsUpdateOneWithoutMailing_listsNestedInputObjectZodSchema = makeSchema();
