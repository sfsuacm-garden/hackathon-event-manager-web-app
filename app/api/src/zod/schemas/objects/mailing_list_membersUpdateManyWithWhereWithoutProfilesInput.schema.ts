import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersScalarWhereInputObjectSchema } from './mailing_list_membersScalarWhereInput.schema';
import { mailing_list_membersUpdateManyMutationInputObjectSchema } from './mailing_list_membersUpdateManyMutationInput.schema';
import { mailing_list_membersUncheckedUpdateManyWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedUpdateManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => mailing_list_membersUpdateManyMutationInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedUpdateManyWithoutProfilesInputObjectSchema)])
}).strict();
export const mailing_list_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateManyWithWhereWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateManyWithWhereWithoutProfilesInput>;
export const mailing_list_membersUpdateManyWithWhereWithoutProfilesInputObjectZodSchema = makeSchema();
