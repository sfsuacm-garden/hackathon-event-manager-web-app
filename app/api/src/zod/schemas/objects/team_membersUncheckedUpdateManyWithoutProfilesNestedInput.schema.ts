import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateWithoutProfilesInputObjectSchema } from './team_membersCreateWithoutProfilesInput.schema';
import { team_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateWithoutProfilesInput.schema';
import { team_membersCreateOrConnectWithoutProfilesInputObjectSchema } from './team_membersCreateOrConnectWithoutProfilesInput.schema';
import { team_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema } from './team_membersUpsertWithWhereUniqueWithoutProfilesInput.schema';
import { team_membersCreateManyProfilesInputEnvelopeObjectSchema } from './team_membersCreateManyProfilesInputEnvelope.schema';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema } from './team_membersUpdateWithWhereUniqueWithoutProfilesInput.schema';
import { team_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema } from './team_membersUpdateManyWithWhereWithoutProfilesInput.schema';
import { team_membersScalarWhereInputObjectSchema } from './team_membersScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => team_membersCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => team_membersCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => team_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => team_membersCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => team_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => team_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => team_membersScalarWhereInputObjectSchema), z.lazy(() => team_membersScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const team_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedUpdateManyWithoutProfilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedUpdateManyWithoutProfilesNestedInput>;
export const team_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectZodSchema = makeSchema();
