import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema } from './teamsUpdateOneRequiredWithoutTeam_membersNestedInput.schema';
import { profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema } from './profilesUpdateOneRequiredWithoutTeam_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  teams: z.lazy(() => teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema).optional(),
  profiles: z.lazy(() => profilesUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema).optional()
}).strict();
export const team_membersUpdateInputObjectSchema: z.ZodType<Prisma.team_membersUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateInput>;
export const team_membersUpdateInputObjectZodSchema = makeSchema();
