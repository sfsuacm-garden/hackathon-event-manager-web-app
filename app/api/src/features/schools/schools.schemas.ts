import z from 'zod';
import { SchoolFindManySchema } from '../../zod/schemas';

// Just use the generated where schema + add pagination
export const getSchoolsByQuerySchema = SchoolFindManySchema;

export type GetSchoolsQuerySchema = z.infer<typeof getSchoolsByQuerySchema>;
