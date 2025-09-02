import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateWithoutTeamsInputObjectSchema } from './team_membersCreateWithoutTeamsInput.schema';
import { team_membersUncheckedCreateWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateWithoutTeamsInput.schema';
import { team_membersCreateOrConnectWithoutTeamsInputObjectSchema } from './team_membersCreateOrConnectWithoutTeamsInput.schema';
import { team_membersUpsertWithWhereUniqueWithoutTeamsInputObjectSchema } from './team_membersUpsertWithWhereUniqueWithoutTeamsInput.schema';
import { team_membersCreateManyTeamsInputEnvelopeObjectSchema } from './team_membersCreateManyTeamsInputEnvelope.schema';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithWhereUniqueWithoutTeamsInputObjectSchema } from './team_membersUpdateWithWhereUniqueWithoutTeamsInput.schema';
import { team_membersUpdateManyWithWhereWithoutTeamsInputObjectSchema } from './team_membersUpdateManyWithWhereWithoutTeamsInput.schema';
import { team_membersScalarWhereInputObjectSchema } from './team_membersScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema).array(), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => team_membersCreateOrConnectWithoutTeamsInputObjectSchema), z.lazy(() => team_membersCreateOrConnectWithoutTeamsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => team_membersUpsertWithWhereUniqueWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUpsertWithWhereUniqueWithoutTeamsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => team_membersCreateManyTeamsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => team_membersUpdateWithWhereUniqueWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUpdateWithWhereUniqueWithoutTeamsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => team_membersUpdateManyWithWhereWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUpdateManyWithWhereWithoutTeamsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => team_membersScalarWhereInputObjectSchema), z.lazy(() => team_membersScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const team_membersUncheckedUpdateManyWithoutTeamsNestedInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput>;
export const team_membersUncheckedUpdateManyWithoutTeamsNestedInputObjectZodSchema = makeSchema();
