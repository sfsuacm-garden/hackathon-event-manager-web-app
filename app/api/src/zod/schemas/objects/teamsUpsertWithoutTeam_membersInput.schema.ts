import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsUpdateWithoutTeam_membersInputObjectSchema } from './teamsUpdateWithoutTeam_membersInput.schema';
import { teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedUpdateWithoutTeam_membersInput.schema';
import { teamsCreateWithoutTeam_membersInputObjectSchema } from './teamsCreateWithoutTeam_membersInput.schema';
import { teamsUncheckedCreateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedCreateWithoutTeam_membersInput.schema';
import { teamsWhereInputObjectSchema } from './teamsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => teamsUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema)]),
  create: z.union([z.lazy(() => teamsCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutTeam_membersInputObjectSchema)]),
  where: z.lazy(() => teamsWhereInputObjectSchema).optional()
}).strict();
export const teamsUpsertWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsUpsertWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpsertWithoutTeam_membersInput>;
export const teamsUpsertWithoutTeam_membersInputObjectZodSchema = makeSchema();
