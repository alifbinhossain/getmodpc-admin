export type ISetting = {
  id: string;
  key: string;
  value: object;
  created_at: string;
  updated_at: string;
};

export type IUpdateSettingPayload = {
  key: string;
  value: object;
};

export type IThemeSetting = {
  key: 'theme';
  value: {
    background_color: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
  };
};

export type IRatingSetting = {
  key: 'rating';
  value: {
    is_active: boolean;
    success_message: string;
    error_message: string;
  };
};

export type ISeoSetting = {
  key: 'seo';
  value: {
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
  };
};

export type ISocialLinkSetting = {
  key: 'social_links';
  value: Array<{
    label: string;
    url: string;
    is_enabled: boolean;
    is_open_new_tab: boolean;
  }>;
};

export type IIconSetting = {
  key: 'icons';
  value: Array<{
    alt_text: string;
    url: string;
    name: string;
  }>;
};

export type ILinkSetting = {
  key: 'links';
  value: {
    primary_cta_label: string;
    primary_cta_url: string;
    secondary_cta_label: string;
    secondary_cta_url: string;
    links: Array<{
      label: string;
      url: string;
      is_enabled: boolean;
      is_open_new_tab: boolean;
    }>;
  };
};

export type IFooterSetting = {
  key: 'footer';
  value: {
    footer_heading: string;
    footer_description: string;
    newsletter_title: string;
    newsletter_description: string;
    copyright_text: string;
    footer_note: string;
    footer_links: { label: string; url: string }[];
  };
};

export type ISettingMap = {
  seo: ISeoSetting['value'];
  theme: IThemeSetting['value'];
  rating: IRatingSetting['value'];
  links: ILinkSetting['value'];
  social_links: ISocialLinkSetting['value'];
  footer: IFooterSetting['value'];
  icons: IIconSetting['value'];
  [key: string]: any;
};
