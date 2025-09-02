import { z } from 'zod';

export const ApplicationsScalarFieldEnumSchema = z.enum(['id', 'event_id', 'user_id', 'status', 'school', 'graduation_year', 'experience_level', 'submission_data', 'created_at', 'public_status', 'internal_status', 'school_id', 'dob', 'phone_number', 'level_of_study', 'country_of_residence', 'linkedin_url', 'mlh_authorized_promo_email', 'mlh_authorized_data_share', 'mlh_code_of_conduct_aggreemeant', 'dietary_vegetarian', 'dietary_vegan', 'dietary_celiac_disease', 'dietary_kosher', 'dietary_halal', 'gender', 'pronouns', 'race_ethnicity', 'sexual_orientation', 'education_level', 'tshirt_size', 'major_field_of_study'])

export type ApplicationsScalarFieldEnum = z.infer<typeof ApplicationsScalarFieldEnumSchema>;