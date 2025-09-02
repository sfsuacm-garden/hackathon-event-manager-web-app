import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { applicationsCountOrderByAggregateInputObjectSchema } from './applicationsCountOrderByAggregateInput.schema';
import { applicationsAvgOrderByAggregateInputObjectSchema } from './applicationsAvgOrderByAggregateInput.schema';
import { applicationsMaxOrderByAggregateInputObjectSchema } from './applicationsMaxOrderByAggregateInput.schema';
import { applicationsMinOrderByAggregateInputObjectSchema } from './applicationsMinOrderByAggregateInput.schema';
import { applicationsSumOrderByAggregateInputObjectSchema } from './applicationsSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  school: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  graduation_year: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  experience_level: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  submission_data: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  public_status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  internal_status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  school_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dob: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone_number: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  level_of_study: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  country_of_residence: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  linkedin_url: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  mlh_authorized_promo_email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  mlh_authorized_data_share: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  mlh_code_of_conduct_aggreemeant: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dietary_vegetarian: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dietary_vegan: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dietary_celiac_disease: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dietary_kosher: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dietary_halal: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  gender: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pronouns: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  race_ethnicity: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sexual_orientation: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  education_level: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tshirt_size: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  major_field_of_study: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => applicationsCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => applicationsAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => applicationsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => applicationsMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => applicationsSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const applicationsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.applicationsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsOrderByWithAggregationInput>;
export const applicationsOrderByWithAggregationInputObjectZodSchema = makeSchema();
