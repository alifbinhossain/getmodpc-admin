import z from 'zod/v3';

const hexColor = /^#([0-9A-F]{3}){1,2}$/i;

const linkItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Enter a valid URL'),
});

const imageUrlField = z.string().url('Enter a valid image URL');
const ratingStyleField = z.enum(['stars', 'score', 'badge']).default('stars');

export const seoSettingsSchema = z.object({
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
});

export type ISeoSettingsSchema = z.infer<typeof seoSettingsSchema>;

export const seoSettingsDefaults: ISeoSettingsSchema = {
  site_name: 'GetModPC',
  site_tagline: 'Premium APKs, games, updates, and editorial picks.',
  meta_title: 'GetModPC Admin Dashboard',
  meta_description:
    'Manage SEO, themes, ratings, links, footer content, and icons for the GetModPC dashboard from one place.',
  canonical_url: 'https://getmodpc.com',
  meta_keywords: 'apk, mod apk, android apps, games, downloads',
  og_title: 'GetModPC',
  og_description:
    'Curated Android apps, games, editor picks, and updated downloads.',
  robots_index: true,
  robots_follow: true,
};

export function getSeoSettingsDefaults(
  values?: Partial<ISeoSettingsSchema>
): ISeoSettingsSchema {
  return {
    ...seoSettingsDefaults,
    ...values,
  };
}

export const themeSettingsSchema = z.object({
  primary_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  secondary_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  accent_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  background_color: z.string().regex(hexColor, 'Enter a valid hex color'),
});

export type IThemeSettingsSchema = z.infer<typeof themeSettingsSchema>;

export const themeSettingsDefaults: IThemeSettingsSchema = {
  primary_color: '#111827',
  secondary_color: '#f3f4f6',
  accent_color: '#16a34a',
  background_color: '#d7d7d7',
};

export function getThemeSettingsDefaults(
  values?: Partial<IThemeSettingsSchema>
): IThemeSettingsSchema {
  return {
    ...themeSettingsDefaults,
    ...values,
  };
}

export const ratingSettingsSchema = z.object({
  rating_style: ratingStyleField,
  default_rating_value: z
    .number()
    .min(0, 'Minimum is 0')
    .max(5, 'Maximum is 5'),
  default_rating_count: z
    .number()
    .int('Rating count must be a whole number')
    .min(1, 'Rating count is required'),
  rating_badge_text: z.string().min(2, 'Badge text is required').max(80),
  rating_description: z.string().min(10, 'Description is required').max(280),
  show_editor_pick_badge: z.boolean().default(true),
  show_user_rating: z.boolean().default(true),
});

export type IRatingSettingsSchema = z.infer<typeof ratingSettingsSchema>;

export const ratingSettingsDefaults: IRatingSettingsSchema = {
  rating_style: 'stars',
  default_rating_value: 4.8,
  default_rating_count: 12840,
  rating_badge_text: 'Editor Approved',
  rating_description:
    'Display trusted review badges and aggregate rating signals across app detail pages.',
  show_editor_pick_badge: true,
  show_user_rating: true,
};

export function getRatingSettingsDefaults(
  values?: Partial<IRatingSettingsSchema>
): IRatingSettingsSchema {
  return {
    ...ratingSettingsDefaults,
    ...values,
  };
}

export const linksSettingsSchema = z.object({
  primary_cta_label: z.string().min(2, 'Primary CTA label is required').max(80),
  primary_cta_url: z.string().url('Enter a valid URL'),
  secondary_cta_label: z
    .string()
    .min(2, 'Secondary CTA label is required')
    .max(80),
  secondary_cta_url: z.string().url('Enter a valid URL'),
  useful_links: z.array(linkItemSchema).default([]),
});

export type ILinksSettingsSchema = z.infer<typeof linksSettingsSchema>;

export const linksSettingsDefaults: ILinksSettingsSchema = {
  primary_cta_label: 'Download App',
  primary_cta_url: 'https://getmodpc.com/download',
  secondary_cta_label: 'View Changelog',
  secondary_cta_url: 'https://getmodpc.com/changelog',
  useful_links: [
    { label: 'Support Center', url: 'https://getmodpc.com/support' },
    { label: 'Privacy Policy', url: 'https://getmodpc.com/privacy' },
  ],
};

export function getLinksSettingsDefaults(
  values?: Partial<ILinksSettingsSchema>
): ILinksSettingsSchema {
  return {
    ...linksSettingsDefaults,
    ...values,
  };
}

export const socialLinksSettingsSchema = z.object({
  social_links: z.array(linkItemSchema).default([]),
});

export type ISocialLinksSettingsSchema = z.infer<
  typeof socialLinksSettingsSchema
>;

export const socialLinksSettingsDefaults: ISocialLinksSettingsSchema = {
  social_links: [
    { label: 'Facebook', url: 'https://facebook.com/getmodpc' },
    { label: 'X', url: 'https://x.com/getmodpc' },
    { label: 'Telegram', url: 'https://t.me/getmodpc' },
  ],
};

export function getSocialLinksSettingsDefaults(
  values?: Partial<ISocialLinksSettingsSchema>
): ISocialLinksSettingsSchema {
  return {
    ...socialLinksSettingsDefaults,
    ...values,
  };
}

export const footerSettingsSchema = z.object({
  footer_heading: z.string().min(2, 'Footer heading is required').max(120),
  footer_description: z.string().min(20, 'Footer description is required'),
  newsletter_title: z.string().min(2, 'Newsletter title is required').max(120),
  newsletter_description: z
    .string()
    .min(10, 'Newsletter description is required')
    .max(240),
  copyright_text: z.string().min(4, 'Copyright text is required').max(180),
  footer_note: z.string().min(10, 'Footer note is required').max(320),
  footer_links: z.array(linkItemSchema).default([]),
});

export type IFooterSettingsSchema = z.infer<typeof footerSettingsSchema>;

export const footerSettingsDefaults: IFooterSettingsSchema = {
  footer_heading: 'Stay Updated',
  footer_description:
    '<p>Use the footer area to promote trusted downloads, support access, and editorial highlights.</p>',
  newsletter_title: 'Weekly Release Digest',
  newsletter_description:
    'Send subscribers the latest apps, game updates, and editorial picks.',
  copyright_text: '© 2026 GetModPC. All rights reserved.',
  footer_note:
    'Downloads are reviewed regularly, but users should still verify compatibility and local compliance before installation.',
  footer_links: [
    { label: 'About Us', url: 'https://getmodpc.com/about' },
    { label: 'Contact', url: 'https://getmodpc.com/contact' },
  ],
};

export function getFooterSettingsDefaults(
  values?: Partial<IFooterSettingsSchema>
): IFooterSettingsSchema {
  return {
    ...footerSettingsDefaults,
    ...values,
  };
}

export const iconSettingsSchema = z.object({
  site_logo: imageUrlField,
  header_logo: imageUrlField,
  favicon: imageUrlField,
  apple_touch_icon: imageUrlField,
  og_image: imageUrlField,
});

export type IIconSettingsSchema = z.infer<typeof iconSettingsSchema>;

export const iconSettingsDefaults: IIconSettingsSchema = {
  site_logo: 'https://placehold.co/512x160/png',
  header_logo: 'https://placehold.co/320x96/png',
  favicon: 'https://placehold.co/64x64/png',
  apple_touch_icon: 'https://placehold.co/180x180/png',
  og_image: 'https://placehold.co/1200x630/png',
};

export function getIconSettingsDefaults(
  values?: Partial<IIconSettingsSchema>
): IIconSettingsSchema {
  return {
    ...iconSettingsDefaults,
    ...values,
  };
}
