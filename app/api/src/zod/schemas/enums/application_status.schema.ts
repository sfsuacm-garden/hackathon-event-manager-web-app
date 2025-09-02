import { z } from 'zod';

export const application_statusSchema = z.enum(['pending', 'rejected', 'accepted', 'waitlisted'])

export type application_status = z.infer<typeof application_statusSchema>;