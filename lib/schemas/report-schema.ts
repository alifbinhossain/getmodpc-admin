import { EnumReportStatus } from '@/types/report';
import { z } from 'zod/v3';

export const createReportReasonSchema = z.object({
  title: z.string().min(1, 'Reason is required'),
  is_active: z.boolean().default(true),
});

export const updateReportSchema = z.object({
  status: z
    .enum(Object.values(EnumReportStatus) as [string, ...string[]])
    .default(EnumReportStatus.OPEN),
});

export type ICreateReportReasonSchema = z.infer<
  typeof createReportReasonSchema
>;

export type IUpdateReportSchema = z.infer<typeof updateReportSchema>;
