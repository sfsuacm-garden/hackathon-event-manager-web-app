import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutTeam_membersInputObjectSchema } from './profilesCreateWithoutTeam_membersInput.schema';
import { profilesUncheckedCreateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedCreateWithoutTeam_membersInput.schema';
import { profilesCreateOrConnectWithoutTeam_membersInputObjectSchema } from './profilesCreateOrConnectWithoutTeam_membersInput.schema';
import { profilesUpsertWithoutTeam_membersInputObjectSchema } from './profilesUpsertWithoutTeam_membersInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema } from './profilesUpdateToOneWithWhereWithoutTeam_membersInput.schema';
import { profilesUpdateWithoutTeam_membersInputObjectSchema } from './profilesUpdateWithoutTeam_membersInput.schema';
import { profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutTeam_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutTeam_membersInputObjectSchema).optional(),
  upsert: z.lazy(() => profilesUpsertWithoutTeam_membersInputObjectSchema).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => profilesUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema)]).optional()
}).strict();
export const profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema: z.ZodType<Prisma.profilesUpdateOneRequiredWithoutTeam_membersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateOneRequiredWithoutTeam_membersNestedInput>;
export const profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectZodSchema = makeSchema();
