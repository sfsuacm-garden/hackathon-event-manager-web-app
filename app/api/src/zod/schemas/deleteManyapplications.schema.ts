import { z } from 'zod';
import { applicationsWhereInputObjectSchema } from './objects/applicationsWhereInput.schema';

export const applicationsDeleteManySchema = z.object({ where: applicationsWhereInputObjectSchema.optional()  })