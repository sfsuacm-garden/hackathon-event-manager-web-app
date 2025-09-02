import { z } from 'zod';

export const t_shirt_sizeSchema = z.enum(['US_XS', 'US_S', 'US_M', 'US_L', 'US_XL', 'US_XXL', 'UK_6', 'UK_8', 'UK_10', 'UK_12', 'UK_14', 'UK_16'])

export type t_shirt_size = z.infer<typeof t_shirt_sizeSchema>;