import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsCreateManyInputObjectSchema } from './objects/applicationsCreateManyInput.schema';

export const applicationsCreateManyAndReturnSchema = z.object({ select: applicationsSelectObjectSchema.optional(), data: z.union([ applicationsCreateManyInputObjectSchema, z.array(applicationsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()