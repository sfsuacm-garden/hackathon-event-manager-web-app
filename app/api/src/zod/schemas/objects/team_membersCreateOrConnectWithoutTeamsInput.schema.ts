import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersCreateWithoutTeamsInputObjectSchema } from './team_membersCreateWithoutTeamsInput.schema';
import { team_membersUncheckedCreateWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema)])
}).strict();
export const team_membersCreateOrConnectWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersCreateOrConnectWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateOrConnectWithoutTeamsInput>;
export const team_membersCreateOrConnectWithoutTeamsInputObjectZodSchema = makeSchema();
