import type { ApiResponse } from '@/types';
import type { SettingsRecord, UpdateSettingsPayload } from '@/types/settings';

import { useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { settingsService } from './settings.service';

export function useSettings(initialData?: ApiResponse<SettingsRecord>) {
  return useApiQuery({
    queryKey: queryKeys.settings.current(),
    queryFn: () => settingsService.getSettings(),
    initialData,
  });
}

export function useGetSettingByKey(key: string) {
  return useApiQuery({
    queryKey: queryKeys.settings.settingByKey(key),
    queryFn: () => settingsService.getSettingByKey(key),
  });
}

export function useUpdateSettings() {
  return useApiMutation({
    mutationFn: (payload: UpdateSettingsPayload) =>
      settingsService.updateSettings(payload),
    invalidateKeys: [queryKeys.settings.all],
    successMessage: 'Settings updated successfully.',
  });
}
