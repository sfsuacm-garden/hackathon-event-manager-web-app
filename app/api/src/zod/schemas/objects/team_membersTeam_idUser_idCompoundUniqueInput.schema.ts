import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.string(),
  user_id: z.string()
}).strict();
export const team_membersTeam_idUser_idCompoundUniqueInputObjectSchema: z.ZodType<Prisma.team_membersTeam_idUser_idCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersTeam_idUser_idCompoundUniqueInput>;
export const team_membersTeam_idUser_idCompoundUniqueInputObjectZodSchema = makeSchema();
