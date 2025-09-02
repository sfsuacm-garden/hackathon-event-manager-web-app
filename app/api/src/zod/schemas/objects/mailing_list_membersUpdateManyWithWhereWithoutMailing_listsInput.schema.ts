import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersScalarWhereInputObjectSchema } from './mailing_list_membersScalarWhereInput.schema';
import { mailing_list_membersUpdateManyMutationInputObjectSchema } from './mailing_list_membersUpdateManyMutationInput.schema';
import { mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => mailing_list_membersUpdateManyMutationInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInputObjectSchema)])
}).strict();
export const mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInput>;
export const mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInputObjectZodSchema = makeSchema();
