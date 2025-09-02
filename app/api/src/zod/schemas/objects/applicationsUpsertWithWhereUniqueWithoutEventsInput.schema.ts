import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithoutEventsInputObjectSchema } from './applicationsUpdateWithoutEventsInput.schema';
import { applicationsUncheckedUpdateWithoutEventsInputObjectSchema } from './applicationsUncheckedUpdateWithoutEventsInput.schema';
import { applicationsCreateWithoutEventsInputObjectSchema } from './applicationsCreateWithoutEventsInput.schema';
import { applicationsUncheckedCreateWithoutEventsInputObjectSchema } from './applicationsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => applicationsUpdateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateWithoutEventsInputObjectSchema)]),
  create: z.union([z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const applicationsUpsertWithWhereUniqueWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsUpsertWithWhereUniqueWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpsertWithWhereUniqueWithoutEventsInput>;
export const applicationsUpsertWithWhereUniqueWithoutEventsInputObjectZodSchema = makeSchema();
