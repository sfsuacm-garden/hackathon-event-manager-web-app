import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsUpdateWithoutMailing_listsInputObjectSchema } from './eventsUpdateWithoutMailing_listsInput.schema';
import { eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedUpdateWithoutMailing_listsInput.schema';
import { eventsCreateWithoutMailing_listsInputObjectSchema } from './eventsCreateWithoutMailing_listsInput.schema';
import { eventsUncheckedCreateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedCreateWithoutMailing_listsInput.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => eventsUpdateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema)]),
  create: z.union([z.lazy(() => eventsCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutMailing_listsInputObjectSchema)]),
  where: z.lazy(() => eventsWhereInputObjectSchema).optional()
}).strict();
export const eventsUpsertWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.eventsUpsertWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpsertWithoutMailing_listsInput>;
export const eventsUpsertWithoutMailing_listsInputObjectZodSchema = makeSchema();
