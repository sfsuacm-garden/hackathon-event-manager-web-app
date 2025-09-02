import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsUpdateWithoutEventsInputObjectSchema } from './teamsUpdateWithoutEventsInput.schema';
import { teamsUncheckedUpdateWithoutEventsInputObjectSchema } from './teamsUncheckedUpdateWithoutEventsInput.schema';
import { teamsCreateWithoutEventsInputObjectSchema } from './teamsCreateWithoutEventsInput.schema';
import { teamsUncheckedCreateWithoutEventsInputObjectSchema } from './teamsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => teamsUpdateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedUpdateWithoutEventsInputObjectSchema)]),
  create: z.union([z.lazy(() => teamsCreateWithoutEventsInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const teamsUpsertWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsUpsertWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpsertWithWhereUniqueWithoutEventsInput>;
export const teamsUpsertWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
