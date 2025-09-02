import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsEvent_idUser_idCompoundUniqueInputObjectSchema } from './applicationsEvent_idUser_idCompoundUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  event_id_user_id: z.lazy(() => applicationsEvent_idUser_idCompoundUniqueInputObjectSchema)
}).strict();
export const applicationsWhereUniqueInputObjectSchema: z.ZodType<Prisma.applicationsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsWhereUniqueInput>;
export const applicationsWhereUniqueInputObjectZodSchema = makeSchema();
