import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  event_id: z.literal(true).optional(),
  user_id: z.literal(true).optional(),
  status: z.literal(true).optional(),
  school: z.literal(true).optional(),
  graduation_year: z.literal(true).optional(),
  experience_level: z.literal(true).optional(),
  created_at: z.literal(true).optional(),
  public_status: z.literal(true).optional(),
  internal_status: z.literal(true).optional(),
  school_id: z.literal(true).optional(),
  dob: z.literal(true).optional(),
  phone_number: z.literal(true).optional(),
  level_of_study: z.literal(true).optional(),
  country_of_residence: z.literal(true).optional(),
  linkedin_url: z.literal(true).optional(),
  mlh_authorized_promo_email: z.literal(true).optional(),
  mlh_authorized_data_share: z.literal(true).optional(),
  mlh_code_of_conduct_aggreemeant: z.literal(true).optional(),
  dietary_vegetarian: z.literal(true).optional(),
  dietary_vegan: z.literal(true).optional(),
  dietary_celiac_disease: z.literal(true).optional(),
  dietary_kosher: z.literal(true).optional(),
  dietary_halal: z.literal(true).optional(),
  gender: z.literal(true).optional(),
  pronouns: z.literal(true).optional(),
  race_ethnicity: z.literal(true).optional(),
  sexual_orientation: z.literal(true).optional(),
  education_level: z.literal(true).optional(),
  tshirt_size: z.literal(true).optional(),
  major_field_of_study: z.literal(true).optional()
}).strict();
export const ApplicationsMinAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationsMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationsMinAggregateInputType>;
export const ApplicationsMinAggregateInputObjectZodSchema = makeSchema();
