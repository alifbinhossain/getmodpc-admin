import type { BaseRecord } from './index';

export type RatingStyle = 'stars' | 'score' | 'badge';

export interface SettingsLink {
  label: string;
  url: string;
}

export interface SettingsBody {
  site_name: string;
  site_tagline: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  robots_index: boolean;
  robots_follow: boolean;

  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;

  rating_style: RatingStyle;
  default_rating_value: number;
  default_rating_count: number;
  rating_badge_text: string;
  rating_description: string;
  show_editor_pick_badge: boolean;
  show_user_rating: boolean;

  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  useful_links: SettingsLink[];

  social_links: SettingsLink[];

  footer_heading: string;
  footer_description: string;
  newsletter_title: string;
  newsletter_description: string;
  copyright_text: string;
  footer_note: string;
  footer_links: SettingsLink[];

  site_logo: string;
  header_logo: string;
  favicon: string;
  apple_touch_icon: string;
  og_image: string;
}

export type SettingsRecord = Partial<SettingsBody> & Partial<BaseRecord>;

export type UpdateSettingsPayload = Partial<SettingsBody>;
