import type { ApiResponse } from '@/types';
import type { ISetting, IUpdateSettingPayload } from '@/types/settings';

import { api } from '@/lib/axios';

export const settingsService = {
  getSettings(): Promise<ApiResponse<ISetting[]>> {
    return api.get<ISetting[]>('/settings');
  },

  getSettingByKey<T>(key: string): Promise<ApiResponse<T>> {
    return api.get<T>(`/settings/${key}`);
  },

  updateSettings(
    payload: IUpdateSettingPayload
  ): Promise<ApiResponse<ISetting>> {
    return api.post<ISetting, IUpdateSettingPayload>('/settings', payload);
  },

  deleteSettings(key: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/settings/${key}`);
  },
};
