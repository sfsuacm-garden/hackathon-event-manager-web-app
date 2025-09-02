import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  school: SortOrderSchema.optional(),
  graduation_year: SortOrderSchema.optional(),
  experience_level: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional(),
  public_status: SortOrderSchema.optional(),
  internal_status: SortOrderSchema.optional(),
  school_id: SortOrderSchema.optional(),
  dob: SortOrderSchema.optional(),
  phone_number: SortOrderSchema.optional(),
  level_of_study: SortOrderSchema.optional(),
  country_of_residence: SortOrderSchema.optional(),
  linkedin_url: SortOrderSchema.optional(),
  mlh_authorized_promo_email: SortOrderSchema.optional(),
  mlh_authorized_data_share: SortOrderSchema.optional(),
  mlh_code_of_conduct_aggreemeant: SortOrderSchema.optional(),
  dietary_vegetarian: SortOrderSchema.optional(),
  dietary_vegan: SortOrderSchema.optional(),
  dietary_celiac_disease: SortOrderSchema.optional(),
  dietary_kosher: SortOrderSchema.optional(),
  dietary_halal: SortOrderSchema.optional(),
  gender: SortOrderSchema.optional(),
  pronouns: SortOrderSchema.optional(),
  race_ethnicity: SortOrderSchema.optional(),
  sexual_orientation: SortOrderSchema.optional(),
  education_level: SortOrderSchema.optional(),
  tshirt_size: SortOrderSchema.optional(),
  major_field_of_study: SortOrderSchema.optional()
}).strict();
export const applicationsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.applicationsMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsMinOrderByAggregateInput>;
export const applicationsMinOrderByAggregateInputObjectZodSchema = makeSchema();
