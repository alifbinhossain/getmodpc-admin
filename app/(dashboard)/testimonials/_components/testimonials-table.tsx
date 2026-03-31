'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { TestimonialRecord } from '@/types/testimonial';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { testimonialColumns } from '../_config/testimonial-column';
import { testimonialsService } from '../_config/testimonials.service';

interface TestimonialsTableProps {
  data: TestimonialRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<TestimonialRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function TestimonialsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: TestimonialsTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<TestimonialRecord>
      data={data}
      columns={testimonialColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Testimonials'
      description='Manage all testimonial.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (testimonial) => router.push(`/testimonials/${testimonial.id}`),
        onEdit: (raw) => {
          openModal('EDIT_TESTIMONIAL', raw, refetch);
        },
        onDelete: async (testimonial) => {
          await testimonialsService.deleteTestimonial(testimonial.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by name, designation or content...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_TESTIMONIAL', null, refetch)}>
            Add Testimonial
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await testimonialsService.deleteTestimonials(ids);
        refetch();
      }}
    />
  );
}
