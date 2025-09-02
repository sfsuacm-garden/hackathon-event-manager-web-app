import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema';
import { eventsUpdateWithoutMailing_listsInputObjectSchema } from './eventsUpdateWithoutMailing_listsInput.schema';
import { eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedUpdateWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => eventsUpdateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedUpdateWithoutMailing_listsInputObjectSchema)])
}).strict();
export const eventsUpdateToOneWithWhereWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUpdateToOneWithWhereWithoutMailing_listsInput>;
export const eventsUpdateToOneWithWhereWithoutMailing_listsInputObjectZodSchema = makeSchema();
