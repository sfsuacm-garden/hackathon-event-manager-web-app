import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutApplicationsInputObjectSchema } from './profilesCreateWithoutApplicationsInput.schema';
import { profilesUncheckedCreateWithoutApplicationsInputObjectSchema } from './profilesUncheckedCreateWithoutApplicationsInput.schema';
import { profilesCreateOrConnectWithoutApplicationsInputObjectSchema } from './profilesCreateOrConnectWithoutApplicationsInput.schema';
import { profilesUpsertWithoutApplicationsInputObjectSchema } from './profilesUpsertWithoutApplicationsInput.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesUpdateToOneWithWhereWithoutApplicationsInputObjectSchema } from './profilesUpdateToOneWithWhereWithoutApplicationsInput.schema';
import { profilesUpdateWithoutApplicationsInputObjectSchema } from './profilesUpdateWithoutApplicationsInput.schema';
import { profilesUncheckedUpdateWithoutApplicationsInputObjectSchema } from './profilesUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  upsert: z.lazy(() => profilesUpsertWithoutApplicationsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => profilesWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => profilesWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => profilesUpdateToOneWithWhereWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutApplicationsInputObjectSchema)]).optional()
}).strict();
export const profilesUpdateOneWithoutApplicationsNestedInputObjectSchema: z.ZodType<Prisma.profilesUpdateOneWithoutApplicationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateOneWithoutApplicationsNestedInput>;
export const profilesUpdateOneWithoutApplicationsNestedInputObjectZodSchema = makeSchema();
