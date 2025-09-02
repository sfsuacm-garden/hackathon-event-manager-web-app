import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { applicationsOrderByWithRelationInputObjectSchema } from './objects/applicationsOrderByWithRelationInput.schema';
import { applicationsWhereInputObjectSchema } from './objects/applicationsWhereInput.schema';
import { applicationsWhereUniqueInputObjectSchema } from './objects/applicationsWhereUniqueInput.schema';
import { applicationsCountAggregateInputObjectSchema } from './objects/applicationsCountAggregateInput.schema';

export const applicationsCountSchema: z.ZodType<Prisma.applicationsCountArgs> = z.object({ orderBy: z.union([applicationsOrderByWithRelationInputObjectSchema, applicationsOrderByWithRelationInputObjectSchema.array()]).optional(), where: applicationsWhereInputObjectSchema.optional(), cursor: applicationsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), applicationsCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.applicationsCountArgs>;

export const applicationsCountZodSchema = z.object({ orderBy: z.union([applicationsOrderByWithRelationInputObjectSchema, applicationsOrderByWithRelationInputObjectSchema.array()]).optional(), where: applicationsWhereInputObjectSchema.optional(), cursor: applicationsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), applicationsCountAggregateInputObjectSchema ]).optional() }).strict();