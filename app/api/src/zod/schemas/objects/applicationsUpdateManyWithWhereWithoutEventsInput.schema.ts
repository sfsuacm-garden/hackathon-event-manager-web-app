import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsScalarWhereInputObjectSchema } from './applicationsScalarWhereInput.schema';
import { applicationsUpdateManyMutationInputObjectSchema } from './applicationsUpdateManyMutationInput.schema';
import { applicationsUncheckedUpdateManyWithoutEventsInputObjectSchema } from './applicationsUncheckedUpdateManyWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => applicationsUpdateManyMutationInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateManyWithoutEventsInputObjectSchema)])
}).strict();
export const applicationsUpdateManyWithWhereWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsUpdateManyWithWhereWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpdateManyWithWhereWithoutEventsInput>;
export const applicationsUpdateManyWithWhereWithoutEventsInputObjectZodSchema = makeSchema();
