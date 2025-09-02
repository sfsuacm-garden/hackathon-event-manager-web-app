import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesUpdateWithoutTeam_membersInputObjectSchema } from './profilesUpdateWithoutTeam_membersInput.schema';
import { profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutTeam_membersInput.schema';
import { profilesCreateWithoutTeam_membersInputObjectSchema } from './profilesCreateWithoutTeam_membersInput.schema';
import { profilesUncheckedCreateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedCreateWithoutTeam_membersInput.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => profilesUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema)]),
  create: z.union([z.lazy(() => profilesCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutTeam_membersInputObjectSchema)]),
  where: z.lazy(() => profilesWhereInputObjectSchema).optional()
}).strict();
export const profilesUpsertWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesUpsertWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpsertWithoutTeam_membersInput>;
export const profilesUpsertWithoutTeam_membersInputObjectZodSchema = makeSchema();
