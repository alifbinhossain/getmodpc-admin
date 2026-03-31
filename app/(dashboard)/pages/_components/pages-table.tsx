'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { PageRecord } from '@/types/page';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { pageColumns } from '../_config/page-column';
import { pagesService } from '../_config/pages.service';

interface PagesTableProps {
  data: PageRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<PageRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function PagesTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: PagesTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<PageRecord>
      data={data}
      columns={pageColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Pages'
      description='Manage all page.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (page) => router.push(`/pages/${page.id}`),
        onEdit: (raw) => {
          openModal('EDIT_PAGE', raw, refetch);
        },
        onDelete: async (page) => {
          await pagesService.deletePage(page.id);
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
          <Button onClick={() => openModal('ADD_PAGE', null, refetch)}>
            Add Page
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await pagesService.deletePages(ids);
        refetch();
      }}
    />
  );
}
