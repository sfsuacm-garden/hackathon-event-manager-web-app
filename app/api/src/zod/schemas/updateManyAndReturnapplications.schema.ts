import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsUpdateManyMutationInputObjectSchema } from './objects/applicationsUpdateManyMutationInput.schema';
import { applicationsWhereInputObjectSchema } from './objects/applicationsWhereInput.schema';

export const applicationsUpdateManyAndReturnSchema = z.object({ select: applicationsSelectObjectSchema.optional(), data: applicationsUpdateManyMutationInputObjectSchema, where: applicationsWhereInputObjectSchema.optional()  }).strict()