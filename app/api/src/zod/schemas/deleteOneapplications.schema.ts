import { z } from 'zod';
import { applicationsSelectObjectSchema } from './objects/applicationsSelect.schema';
import { applicationsIncludeObjectSchema } from './objects/applicationsInclude.schema';
import { applicationsWhereUniqueInputObjectSchema } from './objects/applicationsWhereUniqueInput.schema';

export const applicationsDeleteOneSchema = z.object({ select: applicationsSelectObjectSchema.optional(), include: applicationsIncludeObjectSchema.optional(), where: applicationsWhereUniqueInputObjectSchema  })