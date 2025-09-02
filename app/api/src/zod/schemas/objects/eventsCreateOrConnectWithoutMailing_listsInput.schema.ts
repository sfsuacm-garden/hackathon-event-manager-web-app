import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema';
import { eventsCreateWithoutMailing_listsInputObjectSchema } from './eventsCreateWithoutMailing_listsInput.schema';
import { eventsUncheckedCreateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedCreateWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => eventsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => eventsCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutMailing_listsInputObjectSchema)])
}).strict();
export const eventsCreateOrConnectWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.eventsCreateOrConnectWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateOrConnectWithoutMailing_listsInput>;
export const eventsCreateOrConnectWithoutMailing_listsInputObjectZodSchema = makeSchema();
