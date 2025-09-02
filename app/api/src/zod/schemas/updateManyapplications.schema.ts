import { z } from 'zod';
import { applicationsUpdateManyMutationInputObjectSchema } from './objects/applicationsUpdateManyMutationInput.schema';
import { applicationsWhereInputObjectSchema } from './objects/applicationsWhereInput.schema';

export const applicationsUpdateManySchema = z.object({ data: applicationsUpdateManyMutationInputObjectSchema, where: applicationsWhereInputObjectSchema.optional()  })