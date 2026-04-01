import { EnumMediaType } from '@/types/ad';
import z from 'zod/v3';

export const adSchema = z
  .object({
    media_url: z.string().min(1, 'Media URL is required').url(),
    media_type: z.nativeEnum(EnumMediaType, {
      required_error: 'Media type is required',
    }),
    cta_url: z.string().min(1, 'CTA URL is required').url(),
    cta_label: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    is_active: z.boolean().optional(),
    start_at: z.string().transform((val) => new Date(val).toISOString()),
    end_at: z.string().transform((val) => new Date(val).toISOString()),
  })
  .refine((data) => new Date(data.end_at) > new Date(data.start_at), {
    message: 'end_at must be greater than start_at',
    path: ['end_at'],
  });

export type IAdSchema = z.infer<typeof adSchema>;
