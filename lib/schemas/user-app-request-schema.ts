import { EnumUserAppRequestStatus } from '@/types/user-app-request';
import z from 'zod/v3';

export const userAppRequestSchema = z
  .object({
    app_name: z.string().optional(),
    app_url: z.string().url('App URL must be a valid URL').optional(),
    status: z
      .enum(Object.values(EnumUserAppRequestStatus) as [string, ...string[]])
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be updated',
  });

export type IUserAppRequestSchema = z.infer<typeof userAppRequestSchema>;

