import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateWithoutProfilesInputObjectSchema } from './team_membersCreateWithoutProfilesInput.schema';
import { team_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateWithoutProfilesInput.schema';
import { team_membersCreateOrConnectWithoutProfilesInputObjectSchema } from './team_membersCreateOrConnectWithoutProfilesInput.schema';
import { team_membersCreateManyProfilesInputEnvelopeObjectSchema } from './team_membersCreateManyProfilesInputEnvelope.schema';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => team_membersCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => team_membersCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => team_membersCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => team_membersWhereUniqueInputObjectSchema), z.lazy(() => team_membersWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const team_membersCreateNestedManyWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersCreateNestedManyWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateNestedManyWithoutProfilesInput>;
export const team_membersCreateNestedManyWithoutProfilesInputObjectZodSchema = makeSchema();
