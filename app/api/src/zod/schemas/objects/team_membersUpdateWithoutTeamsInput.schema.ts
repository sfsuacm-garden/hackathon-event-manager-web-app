import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema } from './profilesUpdateOneRequiredWithoutTeam_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  profiles: z.lazy(() => profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema).optional()
}).strict();
export const team_membersUpdateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUpdateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateWithoutTeamsInput>;
export const team_membersUpdateWithoutTeamsInputObjectZodSchema = makeSchema();
