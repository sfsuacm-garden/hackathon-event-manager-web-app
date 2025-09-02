import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutApplicationsInputObjectSchema } from './profilesCreateWithoutApplicationsInput.schema';
import { profilesUncheckedCreateWithoutApplicationsInputObjectSchema } from './profilesUncheckedCreateWithoutApplicationsInput.schema';
import { profilesCreateOrConnectWithoutApplicationsInputObjectSchema } from './profilesCreateOrConnectWithoutApplicationsInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional()
}).strict();
export const profilesCreateNestedOneWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.profilesCreateNestedOneWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateNestedOneWithoutApplicationsInput>;
export const profilesCreateNestedOneWithoutApplicationsInputObjectZodSchema = makeSchema();
