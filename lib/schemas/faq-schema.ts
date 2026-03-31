import { EnumPlatformType } from '@/types';
import z from 'zod/v3';

export const faqSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  platform: z
    .enum(Object.values(EnumPlatformType) as [string, ...string[]])
    .default(EnumPlatformType.ANDROID),
});

export type IFaqSchema = z.infer<typeof faqSchema>;
