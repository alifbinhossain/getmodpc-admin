'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { FaqRecord } from '@/types/faq';

import { useFaqs } from '../_config/faq.hooks';
import { FaqsTable } from './faqs-table';

type Props = {
  initialData: PaginatedResponse<FaqRecord>;
};
function Faqs({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useFaqs(params, initialData);
  return (
    <FaqsTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Faqs;
