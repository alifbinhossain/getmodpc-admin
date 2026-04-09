import z from 'zod/v3';

const hexColor = /^#([0-9A-F]{3}){1,2}$/i;

const linkItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Enter a valid URL'),
  is_enabled: z.boolean().default(true),
  is_open_new_tab: z.boolean().default(false),
});

const imageUrlField = z.string().url('Enter a valid image URL');

export const seoSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('seo'),
  value: z.object({
    site_name: z.string().min(2, 'Site name is required').max(120),
    site_tagline: z.string().min(2, 'Tagline is required').max(180),
    meta_title: z.string().min(2, 'Meta title is required').max(160),
    meta_description: z
      .string()
      .min(20, 'Meta description must be at least 20 characters')
      .max(320, 'Meta description is too long'),
    canonical_url: z.string().url('Enter a valid canonical URL'),
    meta_keywords: z.string().min(3, 'Meta keywords are required').max(255),
    og_title: z.string().min(2, 'Open Graph title is required').max(160),
    og_description: z
      .string()
      .min(20, 'Open Graph description must be at least 20 characters')
      .max(320, 'Open Graph description is too long'),
    robots_index: z.boolean().default(true),
    robots_follow: z.boolean().default(true),
  }),
});

export const themeSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('theme'),
  value: z.object({
    primary_color: z.string().regex(hexColor, 'Enter a valid hex color'),
    secondary_color: z.string().regex(hexColor, 'Enter a valid hex color'),
    accent_color: z.string().regex(hexColor, 'Enter a valid hex color'),
    background_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  }),
});

export const ratingSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('rating'),
  value: z.object({
    is_active: z.boolean().default(false),
    success_message: z.string().min(1, 'Success message is required').max(255),
    error_message: z.string().min(1, 'Error message is required').max(255),
  }),
});

export const linksSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('links'),
  value: z.object({
    primary_cta_label: z
      .string()
      .min(2, 'Primary CTA label is required')
      .max(80),
    primary_cta_url: z.string().url('Enter a valid URL'),
    secondary_cta_label: z
      .string()
      .min(2, 'Secondary CTA label is required')
      .max(80),
    secondary_cta_url: z.string().url('Enter a valid URL'),
    useful_links: z.array(linkItemSchema).default([]),
  }),
});

export const socialLinksSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('social_links'),
  value: z.array(linkItemSchema).default([]),
});

export const footerSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('footer'),
  value: z.object({
    footer_heading: z.string().min(1, 'Footer heading is required'),
    footer_description: z.string().min(1, 'Footer description is required'),
    newsletter_title: z.string().min(1, 'Newsletter title is required'),
    newsletter_description: z
      .string()
      .min(1, 'Newsletter description is required'),
    copyright_text: z.string().min(1, 'Copyright text is required'),
    footer_note: z.string().min(1, 'Footer note is required'),
    footer_links: z.array(linkItemSchema).default([]),
  }),
});

export const iconItemSchema = z.object({
  alt_text: z.string().optional(),
  url: imageUrlField,
  name: z.string().min(1, 'Name is required').max(255),
});

export const iconSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required').default('icons'),
  value: z.array(iconItemSchema).default([]),
});

export type ThemeSettingsSchemaType = z.infer<typeof themeSettingsSchema>;
export type RatingSettingsSchemaType = z.infer<typeof ratingSettingsSchema>;
export type LinksSettingsSchemaType = z.infer<typeof linksSettingsSchema>;
export type SocialLinksSettingsSchemaType = z.infer<
  typeof socialLinksSettingsSchema
>;
export type FooterSettingsSchemaType = z.infer<typeof footerSettingsSchema>;
export type IconSettingsSchemaType = z.infer<typeof iconSettingsSchema>;
