'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { MediaRecord } from '@/types/media';
import { Pencil, RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { mediaColumns } from '../_config/media-column';
import { mediasService } from '../_config/medias.service';

interface MediasTableProps {
  data: MediaRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<MediaRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function MediasTable({
  data,
  isLoading,
  isFetching,
  canEdit = false,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: MediasTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<MediaRecord>
      data={data}
      columns={mediaColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Medias'
      description='Manage all media.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (media) => router.push(`/medias/${media.id}`),
        // custom: [
        //   {
        //     label: 'Rename',
        //     onClick: (media) => openModal('RENAME_FILE', media.key, refetch),
        //     icon: <Pencil />,
        //   },
        // ],
        onDelete: async (media) => {
          await mediasService.deleteMedias([media.key]);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by file name...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_MEDIA', null, refetch)}>
            Add Media
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await mediasService.deleteMedias(ids);
        refetch();
      }}
    />
  );
}
