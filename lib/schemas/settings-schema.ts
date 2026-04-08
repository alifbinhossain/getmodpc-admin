import z from 'zod/v3';

const hexColor = /^#([0-9A-F]{3}){1,2}$/i;

const linkItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Enter a valid URL'),
});

export const settingsSchema = z.object({
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

  theme_mode: z.enum(['system', 'light', 'dark']).default('system'),
  primary_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  accent_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  surface_color: z.string().regex(hexColor, 'Enter a valid hex color'),
  enable_soft_shadows: z.boolean().default(true),
  show_glass_cards: z.boolean().default(false),

  rating_style: z.enum(['stars', 'score', 'badge']).default('stars'),
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

  primary_cta_label: z.string().min(2, 'Primary CTA label is required').max(80),
  primary_cta_url: z.string().url('Enter a valid URL'),
  secondary_cta_label: z
    .string()
    .min(2, 'Secondary CTA label is required')
    .max(80),
  secondary_cta_url: z.string().url('Enter a valid URL'),
  useful_links: z.array(linkItemSchema).default([]),

  social_links: z.array(linkItemSchema).default([]),

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

  site_logo: z.string().url('Enter a valid image URL'),
  header_logo: z.string().url('Enter a valid image URL'),
  favicon: z.string().url('Enter a valid image URL'),
  apple_touch_icon: z.string().url('Enter a valid image URL'),
  og_image: z.string().url('Enter a valid image URL'),
});

export type ISettingsSchema = z.infer<typeof settingsSchema>;

export const settingsDefaults: ISettingsSchema = {
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

  theme_mode: 'system',
  primary_color: '#111827',
  accent_color: '#16a34a',
  surface_color: '#f8fafc',
  enable_soft_shadows: true,
  show_glass_cards: false,

  rating_style: 'stars',
  default_rating_value: 4.8,
  default_rating_count: 12840,
  rating_badge_text: 'Editor Approved',
  rating_description:
    'Display trusted review badges and aggregate rating signals across app detail pages.',
  show_editor_pick_badge: true,
  show_user_rating: true,

  primary_cta_label: 'Download App',
  primary_cta_url: 'https://getmodpc.com/download',
  secondary_cta_label: 'View Changelog',
  secondary_cta_url: 'https://getmodpc.com/changelog',
  useful_links: [
    { label: 'Support Center', url: 'https://getmodpc.com/support' },
    { label: 'Privacy Policy', url: 'https://getmodpc.com/privacy' },
  ],

  social_links: [
    { label: 'Facebook', url: 'https://facebook.com/getmodpc' },
    { label: 'X', url: 'https://x.com/getmodpc' },
    { label: 'Telegram', url: 'https://t.me/getmodpc' },
  ],

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

  site_logo: 'https://placehold.co/512x160/png',
  header_logo: 'https://placehold.co/320x96/png',
  favicon: 'https://placehold.co/64x64/png',
  apple_touch_icon: 'https://placehold.co/180x180/png',
  og_image: 'https://placehold.co/1200x630/png',
};

function pickSettingsDefaults<K extends keyof ISettingsSchema>(
  keys: readonly K[]
) {
  return Object.fromEntries(
    keys.map((key) => [key, settingsDefaults[key]])
  ) as Pick<ISettingsSchema, K>;
}

export const seoSettingsSchema = settingsSchema.pick({
  site_name: true,
  site_tagline: true,
  meta_title: true,
  meta_description: true,
  canonical_url: true,
  meta_keywords: true,
  og_title: true,
  og_description: true,
  robots_index: true,
  robots_follow: true,
});

export type ISeoSettingsSchema = z.infer<typeof seoSettingsSchema>;
export const seoSettingsDefaults = pickSettingsDefaults([
  'site_name',
  'site_tagline',
  'meta_title',
  'meta_description',
  'canonical_url',
  'meta_keywords',
  'og_title',
  'og_description',
  'robots_index',
  'robots_follow',
] as const);

export const themeSettingsSchema = settingsSchema.pick({
  theme_mode: true,
  primary_color: true,
  accent_color: true,
  surface_color: true,
  enable_soft_shadows: true,
  show_glass_cards: true,
});

export type IThemeSettingsSchema = z.infer<typeof themeSettingsSchema>;
export const themeSettingsDefaults = pickSettingsDefaults([
  'theme_mode',
  'primary_color',
  'accent_color',
  'surface_color',
  'enable_soft_shadows',
  'show_glass_cards',
] as const);

export const ratingSettingsSchema = settingsSchema.pick({
  rating_style: true,
  default_rating_value: true,
  default_rating_count: true,
  rating_badge_text: true,
  rating_description: true,
  show_editor_pick_badge: true,
  show_user_rating: true,
});

export type IRatingSettingsSchema = z.infer<typeof ratingSettingsSchema>;
export const ratingSettingsDefaults = pickSettingsDefaults([
  'rating_style',
  'default_rating_value',
  'default_rating_count',
  'rating_badge_text',
  'rating_description',
  'show_editor_pick_badge',
  'show_user_rating',
] as const);

export const linksSettingsSchema = settingsSchema.pick({
  primary_cta_label: true,
  primary_cta_url: true,
  secondary_cta_label: true,
  secondary_cta_url: true,
  useful_links: true,
});

export type ILinksSettingsSchema = z.infer<typeof linksSettingsSchema>;
export const linksSettingsDefaults = pickSettingsDefaults([
  'primary_cta_label',
  'primary_cta_url',
  'secondary_cta_label',
  'secondary_cta_url',
  'useful_links',
] as const);

export const socialLinksSettingsSchema = settingsSchema.pick({
  social_links: true,
});

export type ISocialLinksSettingsSchema = z.infer<
  typeof socialLinksSettingsSchema
>;
export const socialLinksSettingsDefaults = pickSettingsDefaults([
  'social_links',
] as const);

export const footerSettingsSchema = settingsSchema.pick({
  footer_heading: true,
  footer_description: true,
  newsletter_title: true,
  newsletter_description: true,
  copyright_text: true,
  footer_note: true,
  footer_links: true,
});

export type IFooterSettingsSchema = z.infer<typeof footerSettingsSchema>;
export const footerSettingsDefaults = pickSettingsDefaults([
  'footer_heading',
  'footer_description',
  'newsletter_title',
  'newsletter_description',
  'copyright_text',
  'footer_note',
  'footer_links',
] as const);

export const iconSettingsSchema = settingsSchema.pick({
  site_logo: true,
  header_logo: true,
  favicon: true,
  apple_touch_icon: true,
  og_image: true,
});

export type IIconSettingsSchema = z.infer<typeof iconSettingsSchema>;
export const iconSettingsDefaults = pickSettingsDefaults([
  'site_logo',
  'header_logo',
  'favicon',
  'apple_touch_icon',
  'og_image',
] as const);
