import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesCreateWithoutTeam_membersInputObjectSchema } from './profilesCreateWithoutTeam_membersInput.schema';
import { profilesUncheckedCreateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedCreateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => profilesCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutTeam_membersInputObjectSchema)])
}).strict();
export const profilesCreateOrConnectWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateOrConnectWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateOrConnectWithoutTeam_membersInput>;
export const profilesCreateOrConnectWithoutTeam_membersInputObjectZodSchema = makeSchema();
