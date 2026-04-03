'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { TestimonialRecord } from '@/types/testimonial';

import { useTestimonials } from '../_config/testimonial.hooks';
import { TestimonialsTable } from './testimonials-table';

type Props = {
  initialData: PaginatedResponse<TestimonialRecord>;
};
function Testimonials({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useTestimonials(params, initialData);
  return (
    <TestimonialsTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Testimonials;
