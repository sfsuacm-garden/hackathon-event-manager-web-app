import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsCreateWithoutTeam_membersInputObjectSchema } from './teamsCreateWithoutTeam_membersInput.schema';
import { teamsUncheckedCreateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedCreateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => teamsCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutTeam_membersInputObjectSchema)])
}).strict();
export const teamsCreateOrConnectWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsCreateOrConnectWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateOrConnectWithoutTeam_membersInput>;
export const teamsCreateOrConnectWithoutTeam_membersInputObjectZodSchema = makeSchema();
