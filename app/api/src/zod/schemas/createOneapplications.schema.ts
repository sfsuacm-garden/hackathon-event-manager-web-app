import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsIncludeObjectSchema } from './objects/applicationsInclude.schema';
import { applicationsCreateInputObjectSchema } from './objects/applicationsCreateInput.schema';
import { applicationsUncheckedCreateInputObjectSchema } from './objects/applicationsUncheckedCreateInput.schema';

export const applicationsCreateOneSchema = z.object({ select: applicationsSelectObjectSchema.optional(), include: applicationsIncludeObjectSchema.optional(), data: z.union([applicationsCreateInputObjectSchema, applicationsUncheckedCreateInputObjectSchema])  })