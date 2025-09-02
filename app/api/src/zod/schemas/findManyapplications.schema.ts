import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { applicationsIncludeObjectSchema } from './objects/applicationsInclude.schema';
import { applicationsOrderByWithRelationInputObjectSchema } from './objects/applicationsOrderByWithRelationInput.schema';
import { applicationsWhereInputObjectSchema } from './objects/applicationsWhereInput.schema';
import { applicationsWhereUniqueInputObjectSchema } from './objects/applicationsWhereUniqueInput.schema';
import { applicationsScalarFieldEnumSchema } from './enums/applicationsScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const applicationsFindManySelectSchema: z.ZodType<Prisma.applicationsSelect> = z.object({
    id: z.boolean().optional(),
    event_id: z.boolean().optional(),
    user_id: z.boolean().optional(),
    status: z.boolean().optional(),
    school: z.boolean().optional(),
    graduation_year: z.boolean().optional(),
    experience_level: z.boolean().optional(),
    submission_data: z.boolean().optional(),
    created_at: z.boolean().optional(),
    public_status: z.boolean().optional(),
    internal_status: z.boolean().optional(),
    school_id: z.boolean().optional(),
    dob: z.boolean().optional(),
    phone_number: z.boolean().optional(),
    level_of_study: z.boolean().optional(),
    country_of_residence: z.boolean().optional(),
    linkedin_url: z.boolean().optional(),
    mlh_authorized_promo_email: z.boolean().optional(),
    mlh_authorized_data_share: z.boolean().optional(),
    mlh_code_of_conduct_aggreemeant: z.boolean().optional(),
    dietary_vegetarian: z.boolean().optional(),
    dietary_vegan: z.boolean().optional(),
    dietary_celiac_disease: z.boolean().optional(),
    dietary_kosher: z.boolean().optional(),
    dietary_halal: z.boolean().optional(),
    gender: z.boolean().optional(),
    pronouns: z.boolean().optional(),
    race_ethnicity: z.boolean().optional(),
    sexual_orientation: z.boolean().optional(),
    education_level: z.boolean().optional(),
    tshirt_size: z.boolean().optional(),
    major_field_of_study: z.boolean().optional(),
    events: z.boolean().optional(),
    profiles: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.applicationsSelect>;

export const applicationsFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    event_id: z.boolean().optional(),
    user_id: z.boolean().optional(),
    status: z.boolean().optional(),
    school: z.boolean().optional(),
    graduation_year: z.boolean().optional(),
    experience_level: z.boolean().optional(),
    submission_data: z.boolean().optional(),
    created_at: z.boolean().optional(),
    public_status: z.boolean().optional(),
    internal_status: z.boolean().optional(),
    school_id: z.boolean().optional(),
    dob: z.boolean().optional(),
    phone_number: z.boolean().optional(),
    level_of_study: z.boolean().optional(),
    country_of_residence: z.boolean().optional(),
    linkedin_url: z.boolean().optional(),
    mlh_authorized_promo_email: z.boolean().optional(),
    mlh_authorized_data_share: z.boolean().optional(),
    mlh_code_of_conduct_aggreemeant: z.boolean().optional(),
    dietary_vegetarian: z.boolean().optional(),
    dietary_vegan: z.boolean().optional(),
    dietary_celiac_disease: z.boolean().optional(),
    dietary_kosher: z.boolean().optional(),
    dietary_halal: z.boolean().optional(),
    gender: z.boolean().optional(),
    pronouns: z.boolean().optional(),
    race_ethnicity: z.boolean().optional(),
    sexual_orientation: z.boolean().optional(),
    education_level: z.boolean().optional(),
    tshirt_size: z.boolean().optional(),
    major_field_of_study: z.boolean().optional(),
    events: z.boolean().optional(),
    profiles: z.boolean().optional()
  }).strict();

export const applicationsFindManySchema: z.ZodType<Prisma.applicationsFindManyArgs> = z.object({ select: applicationsFindManySelectSchema.optional(), include: z.lazy(() => applicationsIncludeObjectSchema.optional()), orderBy: z.union([applicationsOrderByWithRelationInputObjectSchema, applicationsOrderByWithRelationInputObjectSchema.array()]).optional(), where: applicationsWhereInputObjectSchema.optional(), cursor: applicationsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([applicationsScalarFieldEnumSchema, applicationsScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.applicationsFindManyArgs>;

export const applicationsFindManyZodSchema = z.object({ select: applicationsFindManySelectSchema.optional(), include: z.lazy(() => applicationsIncludeObjectSchema.optional()), orderBy: z.union([applicationsOrderByWithRelationInputObjectSchema, applicationsOrderByWithRelationInputObjectSchema.array()]).optional(), where: applicationsWhereInputObjectSchema.optional(), cursor: applicationsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([applicationsScalarFieldEnumSchema, applicationsScalarFieldEnumSchema.array()]).optional() }).strict();