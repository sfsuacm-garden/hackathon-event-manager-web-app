import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithoutProfilesInputObjectSchema } from './applicationsUpdateWithoutProfilesInput.schema';
import { applicationsUncheckedUpdateWithoutProfilesInputObjectSchema } from './applicationsUncheckedUpdateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => applicationsUpdateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateWithoutProfilesInputObjectSchema)])
}).strict();
export const applicationsUpdateWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsUpdateWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpdateWithWhereUniqueWithoutProfilesInput>;
export const applicationsUpdateWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
