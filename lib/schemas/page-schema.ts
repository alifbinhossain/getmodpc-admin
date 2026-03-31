import { PageType } from '@/types/page';
import z from 'zod/v3';

export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  is_active: z.boolean().default(true),
  external_link: z.string().optional().nullable(),
  is_open_new_tab: z.boolean().default(false),
  page_type: z
    .enum(Object.values(PageType) as [string, ...string[]])
    .default(PageType.INTERNAL),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
});

export type IPageSchema = z.infer<typeof pageSchema>;