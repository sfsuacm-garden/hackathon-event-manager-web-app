import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema';
import { profilesUpdateWithoutApplicationsInputObjectSchema } from './profilesUpdateWithoutApplicationsInput.schema';
import { profilesUncheckedUpdateWithoutApplicationsInputObjectSchema } from './profilesUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => profilesUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutApplicationsInputObjectSchema)])
}).strict();
export const profilesUpdateToOneWithWhereWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutApplicationsInput>;
export const profilesUpdateToOneWithWhereWithoutApplicationsInputObjectZodSchema = makeSchema();
