import { BaseQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query';

import { notificationService } from './notification.service';

export function useGetAllNotifications(
  enabled: boolean,
  params?: BaseQueryParams
) {
  return useQuery({
    queryKey: queryKeys.notification.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => notificationService.getAllNotifications(params),
    enabled,
  });
}
