import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithoutProfilesInputObjectSchema } from './applicationsUpdateWithoutProfilesInput.schema';
import { applicationsUncheckedUpdateWithoutProfilesInputObjectSchema } from './applicationsUncheckedUpdateWithoutProfilesInput.schema';
import { applicationsCreateWithoutProfilesInputObjectSchema } from './applicationsCreateWithoutProfilesInput.schema';
import { applicationsUncheckedCreateWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => applicationsUpdateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedUpdateWithoutProfilesInputObjectSchema)]),
  create: z.union([z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const applicationsUpsertWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsUpsertWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUpsertWithWhereUniqueWithoutProfilesInput>;
export const applicationsUpsertWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
