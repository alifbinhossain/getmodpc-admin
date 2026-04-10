export type ISetting = {
  id: string;
  key: string;
  value: object;
  created_at: string;
  updated_at: string;
};

export type ISettingLink = {
  label: string;
  url: string;
  is_enabled: boolean;
  is_open_new_tab: boolean;
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
  value: {
    social_links: ISettingLink[];
  };
};

export type IIconSetting = {
  key: 'icons';
  value: {
    icons: Array<{
      alt_text: string;
      url: string;
      name: string;
    }>;
    verified_badge_tooltip_text: string;
  };
};

export type IButtonSetting = {
  key: 'buttons';
  value: {
    download_button: Omit<ISettingLink, 'url' | 'is_open_new_tab'>;
    telegram_button: ISettingLink;
  };
};

export type IFooterSetting = {
  key: 'footer';
  value: {
    footer_heading: string;
    footer_description: string;
    footer_links: ISettingLink[];
    footer_logo: string;
  };
};

export type ISettingMap = {
  seo: ISeoSetting['value'];
  theme: IThemeSetting['value'];
  rating: IRatingSetting['value'];
  buttons: IButtonSetting['value'];
  social_links: ISocialLinkSetting['value'];
  footer: IFooterSetting['value'];
  icons: IIconSetting['value'];
  [key: string]: unknown;
};
