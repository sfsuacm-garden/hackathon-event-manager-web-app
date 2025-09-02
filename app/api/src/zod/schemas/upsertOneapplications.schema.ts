import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsIncludeObjectSchema } from './objects/applicationsInclude.schema';
import { applicationsWhereUniqueInputObjectSchema } from './objects/applicationsWhereUniqueInput.schema';
import { applicationsCreateInputObjectSchema } from './objects/applicationsCreateInput.schema';
import { applicationsUncheckedCreateInputObjectSchema } from './objects/applicationsUncheckedCreateInput.schema';
import { applicationsUpdateInputObjectSchema } from './objects/applicationsUpdateInput.schema';
import { applicationsUncheckedUpdateInputObjectSchema } from './objects/applicationsUncheckedUpdateInput.schema';

export const applicationsUpsertSchema = z.object({ select: applicationsSelectObjectSchema.optional(), include: applicationsIncludeObjectSchema.optional(), where: applicationsWhereUniqueInputObjectSchema, create: z.union([ applicationsCreateInputObjectSchema, applicationsUncheckedCreateInputObjectSchema ]), update: z.union([ applicationsUpdateInputObjectSchema, applicationsUncheckedUpdateInputObjectSchema ])  })