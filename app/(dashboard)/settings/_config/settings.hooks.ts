import type { ApiResponse } from '@/types';
import type {
  ISetting,
  ISettingMap,
  IUpdateSettingPayload,
} from '@/types/settings';

import { useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { settingsService } from './settings.service';

export function useSettings(initialData?: ApiResponse<ISetting[]>) {
  return useApiQuery({
    queryKey: queryKeys.settings.current(),
    queryFn: () => settingsService.getSettings(),
    initialData,
  });
}

export function useGetSettingByKey<T>(key: string) {
  return useApiQuery({
    queryKey: queryKeys.settings.settingByKey(key),
    queryFn: () => settingsService.getSettingByKey<T>(key),
  });
}

export function useUpdateSettings() {
  return useApiMutation({
    mutationFn: (payload: IUpdateSettingPayload) =>
      settingsService.updateSettings(payload),
    invalidateKeys: [queryKeys.settings.all],
    successMessage: 'Settings updated successfully.',
  });
}

export function useGetSettingValuesDividedByKeys(
  values: ISetting[] = []
): ISettingMap {
  const defaultValues: ISettingMap = {
    seo: {
      meta_title: '',
      meta_description: '',
      canonical_url: '',
      meta_keywords: '',
      og_title: '',
      og_description: '',
      robots_index: true,
      robots_follow: true,
      site_name: '',
      site_tagline: '',
    },
    theme: {
      background_color: '#d7d7d7',
      primary_color: '',
      secondary_color: '',
      accent_color: '',
    },
    rating: {
      is_active: false,
      success_message: 'Thanks for your rating!',
      error_message: 'Something went wrong, please try again.',
    },
    links: {
      primary_cta_label: '',
      primary_cta_url: '',
      secondary_cta_label: '',
      secondary_cta_url: '',

      links: [
        {
          label: 'Discord',
          url: 'https://discord.com/invite/getmodpc',
          is_open_new_tab: true,
          is_enabled: true,
        },
        {
          label: 'GitHub',
          url: 'https://github.com/getmodpc',
          is_open_new_tab: true,
          is_enabled: true,
        },
      ],
    },
    social_links: [
      {
        label: 'Facebook',
        url: 'https://facebook.com/getmodpc',
        is_open_new_tab: true,
        is_enabled: true,
      },
      {
        label: 'X',
        url: 'https://x.com/getmodpc',
        is_open_new_tab: true,
        is_enabled: true,
      },
      {
        label: 'Telegram',
        url: 'https://t.me/getmodpc',
        is_open_new_tab: true,
        is_enabled: true,
      },
      {
        label: 'Twitter',
        url: 'https://twitter.com/getmodpc',
        is_open_new_tab: true,
        is_enabled: true,
      },
    ],
    footer: {
      footer_heading: 'Subscribe to our newsletter',
      newsletter_title: 'Weekly Release Digest',
      footer_description: '',
      newsletter_description: '',
      copyright_text: 'Copyright © 2023 GetModPC',
      footer_note: 'All rights reserved.',
      footer_links: [
        {
          label: 'Privacy Policy',
          url: 'https://getmodpc.com/privacy-policy',
        },
        {
          label: 'Terms of Service',
          url: 'https://getmodpc.com/terms-of-service',
        },
      ],
    },
    icons: [
      {
        alt_text: 'Android',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'android_icon',
      },
      {
        alt_text: 'Apple',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'apple_icon',
      },
      {
        alt_text: 'Windows',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'windows_icon',
      },
      {
        alt_text: 'Version',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'version_icon',
      },
      {
        alt_text: 'Size',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'size_icon',
      },
      {
        alt_text: 'Premium Unlocked Icon',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'premium_unlocked_icon',
      },
      {
        alt_text: 'Verified badge Icon',
        url: 'https://getmodpc.com/favicon.ico',
        name: 'verified_badge_icon',
      },
    ],
  };

  return values.reduce<ISettingMap>((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, defaultValues);
}
