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
    buttons: {
      download_button: {
        label: 'Download',
        is_enabled: true,
      },
      telegram_button: {
        label: 'Telegram',
        url: 'https://t.me/getmodpc',
        is_enabled: true,
        is_open_new_tab: true,
      },
    },
    social_links: {
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
    },
    footer: {
      footer_heading: 'Get Started today',
      footer_description: '',
      footer_logo: '',
      footer_links: [
        {
          label: 'Privacy Policy',
          url: '/privacy-policy',
          is_enabled: true,
          is_open_new_tab: false,
        },
        {
          label: 'Terms of Service',
          url: '/terms-of-service',
          is_enabled: true,
          is_open_new_tab: false,
        },
      ],
    },
    icons: {
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
        {
          alt_text: 'source of truth badge Icon',
          url: 'https://getmodpc.com/favicon.ico',
          name: 'source_of',
        },
      ],
      verified_badge_tooltip_text: '',
    },
  };

  return values.reduce<ISettingMap>((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, defaultValues);
}
