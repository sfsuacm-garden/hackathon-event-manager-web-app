import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersTeam_idUser_idCompoundUniqueInputObjectSchema } from './team_membersTeam_idUser_idCompoundUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id_user_id: z.lazy(() => team_membersTeam_idUser_idCompoundUniqueInputObjectSchema)
}).strict();
export const team_membersWhereUniqueInputObjectSchema: z.ZodType<Prisma.team_membersWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersWhereUniqueInput>;
export const team_membersWhereUniqueInputObjectZodSchema = makeSchema();
