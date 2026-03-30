import { z } from 'zod/v3';

export const createReportReasonSchema = z.object({
  title: z.string().min(1, 'Reason is required'),
  is_active: z.boolean().default(true),
});

export type ICreateReportReasonSchema = z.infer<
  typeof createReportReasonSchema
>;
