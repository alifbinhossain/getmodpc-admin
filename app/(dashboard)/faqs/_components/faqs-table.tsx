'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { FaqRecord } from '@/types/faq';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { faqColumns } from '../_config/faq-column';
import { faqsService } from '../_config/faqs.service';

interface FaqsTableProps {
  data: FaqRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<FaqRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function FaqsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: FaqsTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<FaqRecord>
      data={data}
      columns={faqColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Faqs'
      description='Manage all faqs.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (faq) => router.push(`/faqs/${faq.id}`),
        onEdit: (raw) => {
          openModal('EDIT_FAQ', raw, refetch);
        },
        onDelete: async (faq) => {
          await faqsService.deleteFaq(faq.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by title or content...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_FAQ', null, refetch)}>
            Add Faq
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await faqsService.deleteFaqs(ids);
        refetch();
      }}
    />
  );
}
