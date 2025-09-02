import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsIncludeObjectSchema } from './objects/applicationsInclude.schema';
import { applicationsUpdateInputObjectSchema } from './objects/applicationsUpdateInput.schema';
import { applicationsUncheckedUpdateInputObjectSchema } from './objects/applicationsUncheckedUpdateInput.schema';
import { applicationsWhereUniqueInputObjectSchema } from './objects/applicationsWhereUniqueInput.schema';

export const applicationsUpdateOneSchema = z.object({ select: applicationsSelectObjectSchema.optional(), include: applicationsIncludeObjectSchema.optional(), data: z.union([applicationsUpdateInputObjectSchema, applicationsUncheckedUpdateInputObjectSchema]), where: applicationsWhereUniqueInputObjectSchema  })