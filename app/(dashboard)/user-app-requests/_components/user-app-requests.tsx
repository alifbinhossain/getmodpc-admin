'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { UserAppRequestRecord } from '@/types/user-app-request';

import { useUserAppRequests } from '../_config/user-app-request.hooks';
import { UserAppRequestsTable } from './user-app-requests-table';

type Props = {
  initialData: PaginatedResponse<UserAppRequestRecord>;
};
function UserAppRequests({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useUserAppRequests(params, initialData);
  return (
    <UserAppRequestsTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default UserAppRequests;
