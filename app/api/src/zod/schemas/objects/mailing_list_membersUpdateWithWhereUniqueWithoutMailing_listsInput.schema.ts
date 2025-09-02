import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersUpdateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUpdateWithoutMailing_listsInput.schema';
import { mailing_list_membersUncheckedUpdateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedUpdateWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => mailing_list_membersUpdateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedUpdateWithoutMailing_listsInputObjectSchema)])
}).strict();
export const mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInput>;
export const mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInputObjectZodSchema = makeSchema();
