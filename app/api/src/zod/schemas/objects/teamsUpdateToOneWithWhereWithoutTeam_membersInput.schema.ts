import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereInputObjectSchema } from './teamsWhereInput.schema';
import { teamsUpdateWithoutTeam_membersInputObjectSchema } from './teamsUpdateWithoutTeam_membersInput.schema';
import { teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedUpdateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => teamsUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema)])
}).strict();
export const teamsUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsUpdateToOneWithWhereWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateToOneWithWhereWithoutTeam_membersInput>;
export const teamsUpdateToOneWithWhereWithoutTeam_membersInputObjectZodSchema = makeSchema();
