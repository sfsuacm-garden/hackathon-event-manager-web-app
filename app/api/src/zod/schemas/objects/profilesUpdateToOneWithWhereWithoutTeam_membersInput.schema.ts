import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema';
import { profilesUpdateWithoutTeam_membersInputObjectSchema } from './profilesUpdateWithoutTeam_membersInput.schema';
import { profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => profilesUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema)])
}).strict();
export const profilesUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutTeam_membersInput>;
export const profilesUpdateToOneWithWhereWithoutTeam_membersInputObjectZodSchema = makeSchema();
