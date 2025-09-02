import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesCreateWithoutApplicationsInputObjectSchema } from './profilesCreateWithoutApplicationsInput.schema';
import { profilesUncheckedCreateWithoutApplicationsInputObjectSchema } from './profilesUncheckedCreateWithoutApplicationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => profilesCreateWithoutApplicationsInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutApplicationsInputObjectSchema)])
}).strict();
export const profilesCreateOrConnectWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.profilesCreateOrConnectWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateOrConnectWithoutApplicationsInput>;
export const profilesCreateOrConnectWithoutApplicationsInputObjectZodSchema = makeSchema();
