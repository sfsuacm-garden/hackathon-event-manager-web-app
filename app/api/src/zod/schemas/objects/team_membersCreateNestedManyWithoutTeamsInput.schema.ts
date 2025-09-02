import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateWithoutTeamsInputObjectSchema } from './team_membersCreateWithoutTeamsInput.schema';
import { team_membersUncheckedCreateWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateWithoutTeamsInput.schema';
import { team_membersCreateOrConnectWithoutTeamsInputObjectSchema } from './team_membersCreateOrConnectWithoutTeamsInput.schema';
import { team_membersCreateManyTeamsInputEnvelopeObjectSchema } from './team_membersCreateManyTeamsInputEnvelope.schema';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema).array(), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => team_membersCreateOrConnectWithoutTeamsInputObjectSchema), z.lazy(() => team_membersCreateOrConnectWithoutTeamsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => team_membersCreateManyTeamsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const team_membersCreateNestedManyWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersCreateNestedManyWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateNestedManyWithoutTeamsInput>;
export const team_membersCreateNestedManyWithoutTeamsInputObjectZodSchema = makeSchema();
