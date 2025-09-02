import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsUpdateWithoutEventsInputObjectSchema } from './teamsUpdateWithoutEventsInput.schema';
import { teamsUncheckedUpdateWithoutEventsInputObjectSchema } from './teamsUncheckedUpdateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => teamsUpdateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedUpdateWithoutEventsInputObjectSchema)])
}).strict();
export const teamsUpdateWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsUpdateWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateWithWhereUniqueWithoutEventsInput>;
export const teamsUpdateWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
