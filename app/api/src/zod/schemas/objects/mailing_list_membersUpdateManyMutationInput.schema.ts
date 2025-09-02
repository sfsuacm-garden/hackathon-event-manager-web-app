import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  
}).strict();
export const mailing_list_membersUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateManyMutationInput>;
export const mailing_list_membersUpdateManyMutationInputObjectZodSchema = makeSchema();
