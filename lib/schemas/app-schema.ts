import { EnumAppCommentStatus, EnumPlatformType } from '@/types';
import { EnumAppSource, EnumAppStatus, EnumAppType } from '@/types/app';
import z from 'zod/v3';

const appLinkSchema = z.object({
  name: z.string(),
  link: z.string().url('Invalid link'),
  type: z.string().optional(),
  size: z.string().optional(),
  note: z.string().optional(),
});
export const appSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  platform: z.nativeEnum(EnumPlatformType).optional(),
  type: z.nativeEnum(EnumAppType).optional(),
  source: z.nativeEnum(EnumAppSource, {
    required_error: 'Source is required',
  }),
  description: z.string().min(2, 'Description must be at least 2 characters'),
  summary: z.string().optional().nullable(),
  latest_news: z.string().optional().nullable(),
  header_image: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  genre: z.string().optional().nullable(),
  youtube_id: z.string().optional().nullable(),
  os_version: z.string().min(2, 'OS version must be at least 2 characters'),
  screenshots: z.array(z.string()).optional(),
  app_developers: z.array(z.string()).optional(),
  app_tags: z.array(z.string()).optional(),
  version: z.string().optional().nullable(),
  latest_version: z.string().optional().nullable(),
  show_in_slider: z.boolean().optional(),
  updated: z.string().optional().nullable(),
  status: z.nativeEnum(EnumAppStatus).optional(),
  comment_status: z.nativeEnum(EnumAppCommentStatus).optional(),
  categories: z.array(z.string().uuid('Invalid category ID')).optional(), // array of category IDs
  tags: z.array(z.string().uuid('Invalid tag ID')).optional(), // array of tag IDs
  url: z.string(),
  package_name: z.string(),
  installs: z.string(),
  score_text: z.string(),
  ratings: z.number().int().optional(),
  reviews: z.number().int().optional(),
  size: z.string().optional(),
  is_verified: z.boolean().optional(),
  short_mode: z.string().optional(),
  links: z.array(appLinkSchema).optional(),
  modders: z
    .array(
      z.object({
        title: z.string().optional().nullable(),
        descriptions: z.string().optional().nullable(),
      })
    )
    .optional(),
});

export type IAppSchema = z.infer<typeof appSchema>;
