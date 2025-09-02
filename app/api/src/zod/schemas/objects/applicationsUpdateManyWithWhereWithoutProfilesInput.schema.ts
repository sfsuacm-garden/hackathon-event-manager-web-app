import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsScalarWhereInputObjectSchema } from './applicationsScalarWhereInput.schema';
import { applicationsUpdateManyMutationInputObjectSchema } from './applicationsUpdateManyMutationInput.schema';
import { applicationsUncheckedUpdateManyWithoutProfilesInputObjectSchema } from './applicationsUncheckedUpdateManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => applicationsUpdateManyMutationInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateManyWithoutProfilesInputObjectSchema)])
}).strict();
export const applicationsUpdateManyWithWhereWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsUpdateManyWithWhereWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpdateManyWithWhereWithoutProfilesInput>;
export const applicationsUpdateManyWithWhereWithoutProfilesInputObjectZodSchema = makeSchema();
