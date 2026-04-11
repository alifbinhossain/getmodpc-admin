import { ApiResponse, BaseQueryParams, PaginationMeta } from '@/types';
import { INotificationResponse } from '@/types/notification';

import api, { apiClient } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

export const notificationService = {
  getAllNotifications(
    params?: BaseQueryParams
  ): Promise<{ data: INotificationResponse; meta: PaginationMeta }> {
    const qs: any = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return apiClient.get('/notifications', qs).then((r) => r.data);
  },

  markAsRead(id: string): Promise<ApiResponse<void>> {
    return api.post(`/notifications/${id}`);
  },

  markAllAsRead(): Promise<ApiResponse<void>> {
    return api.post('/notifications/mark-all-as-read');
  },

  deleteNotification(id: string): Promise<ApiResponse<void>> {
    return api.delete(`/notifications/${id}`);
  },

  deleteAllNotifications(): Promise<ApiResponse<void>> {
    return api.delete('/notifications/bulk-delete');
  },
};
