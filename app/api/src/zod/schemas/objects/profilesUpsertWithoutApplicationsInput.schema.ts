import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesUpdateWithoutApplicationsInputObjectSchema } from './profilesUpdateWithoutApplicationsInput.schema';
import { profilesUncheckedUpdateWithoutApplicationsInputObjectSchema } from './profilesUncheckedUpdateWithoutApplicationsInput.schema';
import { profilesCreateWithoutApplicationsInputObjectSchema } from './profilesCreateWithoutApplicationsInput.schema';
import { profilesUncheckedCreateWithoutApplicationsInputObjectSchema } from './profilesUncheckedCreateWithoutApplicationsInput.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => profilesUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutApplicationsInputObjectSchema)]),
  create: z.union([z.lazy(() => profilesCreateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutApplicationsInputObjectSchema)]),
  where: z.lazy(() => profilesWhereInputObjectSchema).optional()
}).strict();
export const profilesUpsertWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.profilesUpsertWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpsertWithoutApplicationsInput>;
export const profilesUpsertWithoutApplicationsInputObjectZodSchema = makeSchema();
