'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { AdRecord } from '@/types/ad';

import { useAds } from '../_config/ad.hooks';
import { AdsTable } from './ads-table';

type Props = {
  initialData: PaginatedResponse<AdRecord>;
};
function Ads({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useAds(params, initialData);
  return (
    <AdsTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Ads;
