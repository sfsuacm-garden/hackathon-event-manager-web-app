import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateWithoutMailing_listsInputObjectSchema } from './eventsCreateWithoutMailing_listsInput.schema';
import { eventsUncheckedCreateWithoutMailing_listsInputObjectSchema } from './eventsUncheckedCreateWithoutMailing_listsInput.schema';
import { eventsCreateOrConnectWithoutMailing_listsInputObjectSchema } from './eventsCreateOrConnectWithoutMailing_listsInput.schema';
import { eventsWhereUniqueInputObjectSchema } from './eventsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => eventsCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => eventsUncheckedCreateWithoutMailing_listsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => eventsCreateOrConnectWithoutMailing_listsInputObjectSchema).optional(),
  connect: z.lazy(() => eventsWhereUniqueInputObjectSchema).optional()
}).strict();
export const eventsCreateNestedOneWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.eventsCreateNestedOneWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateNestedOneWithoutMailing_listsInput>;
export const eventsCreateNestedOneWithoutMailing_listsInputObjectZodSchema = makeSchema();
