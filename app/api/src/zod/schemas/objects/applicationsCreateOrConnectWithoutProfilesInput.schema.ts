import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsCreateWithoutProfilesInputObjectSchema } from './applicationsCreateWithoutProfilesInput.schema';
import { applicationsUncheckedCreateWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const applicationsCreateOrConnectWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsCreateOrConnectWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateOrConnectWithoutProfilesInput>;
export const applicationsCreateOrConnectWithoutProfilesInputObjectZodSchema = makeSchema();
