import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsCreateWithoutEventsInputObjectSchema } from './teamsCreateWithoutEventsInput.schema';
import { teamsUncheckedCreateWithoutEventsInputObjectSchema } from './teamsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => teamsCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const teamsCreateOrConnectWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsCreateOrConnectWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateOrConnectWithoutEventsInput>;
export const teamsCreateOrConnectWithoutEventsInputObjectZodSchema = makeSchema();
