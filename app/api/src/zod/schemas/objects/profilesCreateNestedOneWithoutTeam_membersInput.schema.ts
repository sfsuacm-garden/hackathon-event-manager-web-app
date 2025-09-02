import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutTeam_membersInputObjectSchema } from './profilesCreateWithoutTeam_membersInput.schema';
import { profilesUncheckedCreateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedCreateWithoutTeam_membersInput.schema';
import { profilesCreateOrConnectWithoutTeam_membersInputObjectSchema } from './profilesCreateOrConnectWithoutTeam_membersInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutTeam_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutTeam_membersInputObjectSchema).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional()
}).strict();
export const profilesCreateNestedOneWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateNestedOneWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateNestedOneWithoutTeam_membersInput>;
export const profilesCreateNestedOneWithoutTeam_membersInputObjectZodSchema = makeSchema();
