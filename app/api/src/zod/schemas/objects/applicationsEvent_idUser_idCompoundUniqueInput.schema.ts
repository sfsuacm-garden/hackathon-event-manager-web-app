import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  event_id: z.string(),
  user_id: z.string()
}).strict();
export const applicationsEvent_idUser_idCompoundUniqueInputObjectSchema: z.ZodType<Prisma.applicationsEvent_idUser_idCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsEvent_idUser_idCompoundUniqueInput>;
export const applicationsEvent_idUser_idCompoundUniqueInputObjectZodSchema = makeSchema();
