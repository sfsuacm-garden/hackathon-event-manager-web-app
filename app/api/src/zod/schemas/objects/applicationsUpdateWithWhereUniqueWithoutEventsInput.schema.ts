import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithoutEventsInputObjectSchema } from './applicationsUpdateWithoutEventsInput.schema';
import { applicationsUncheckedUpdateWithoutEventsInputObjectSchema } from './applicationsUncheckedUpdateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => applicationsUpdateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateWithoutEventsInputObjectSchema)])
}).strict();
export const applicationsUpdateWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsUpdateWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpdateWithWhereUniqueWithoutEventsInput>;
export const applicationsUpdateWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
