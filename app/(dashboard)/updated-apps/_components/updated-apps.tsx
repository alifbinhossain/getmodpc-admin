'use client';

import { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { UpdatedAppRecord } from '@/types/app';

import { useUpdatedApps } from '../../apps/_config/app.hooks';
import { UpdatedAppsTable } from './updated-apps-table';

type Props = {
  initialData: PaginatedResponse<UpdatedAppRecord>;
};
function UpdatedApps({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const { data, isLoading, isFetching, refetch } = useUpdatedApps(
    params,
    initialData
  );
  return (
    <UpdatedAppsTable
      isLoading={isLoading || isFetching}
      data={data?.data ?? []}
      canDelete={true}
      rowCount={data?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default UpdatedApps;
