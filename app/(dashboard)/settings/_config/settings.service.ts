import type { ApiResponse } from '@/types';
import type { SettingsRecord, UpdateSettingsPayload } from '@/types/settings';

import { api } from '@/lib/axios';

export const settingsService = {
  getSettings(): Promise<ApiResponse<SettingsRecord>> {
    return api.get<SettingsRecord>('/settings');
  },

  getSettingByKey(key: string): Promise<ApiResponse<SettingsRecord>> {
    return api.get<SettingsRecord>(`/settings/${key}`);
  },

  updateSettings(
    payload: UpdateSettingsPayload
  ): Promise<ApiResponse<SettingsRecord>> {
    return api.post<SettingsRecord, UpdateSettingsPayload>(
      '/settings',
      payload
    );
  },

  deleteSettings(key: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/settings/${key}`);
  },
};
