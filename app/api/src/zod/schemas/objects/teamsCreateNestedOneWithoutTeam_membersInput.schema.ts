import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateWithoutTeam_membersInputObjectSchema } from './teamsCreateWithoutTeam_membersInput.schema';
import { teamsUncheckedCreateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedCreateWithoutTeam_membersInput.schema';
import { teamsCreateOrConnectWithoutTeam_membersInputObjectSchema } from './teamsCreateOrConnectWithoutTeam_membersInput.schema';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => teamsCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutTeam_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => teamsCreateOrConnectWithoutTeam_membersInputObjectSchema).optional(),
  connect: z.lazy(() => teamsWhereUniqueInputObjectSchema).optional()
}).strict();
export const teamsCreateNestedOneWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsCreateNestedOneWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateNestedOneWithoutTeam_membersInput>;
export const teamsCreateNestedOneWithoutTeam_membersInputObjectZodSchema = makeSchema();
