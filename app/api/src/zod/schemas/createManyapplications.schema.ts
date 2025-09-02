import { z } from 'zod';
import { applicationsCreateManyInputObjectSchema } from './objects/applicationsCreateManyInput.schema';

export const applicationsCreateManySchema = z.object({ data: z.union([ applicationsCreateManyInputObjectSchema, z.array(applicationsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })