'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { tagColumns } from '../_config/tags-column';
import { tagsService } from '../_config/tags.service';

interface DevelopersTableProps {
  data: TagAndDeveloperRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<TagAndDeveloperRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function TagsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: DevelopersTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<TagAndDeveloperRecord>
      data={data}
      columns={tagColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Tags'
      description='Manage all tag.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (tag) => router.push(`/tags/${tag.id}`),
        onEdit: (raw) => {
          openModal('EDIT_TAG', raw, refetch);
        },
        onDelete: async (tag) => {
          await tagsService.deleteTag(tag.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by details or email...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_TAG', null, refetch)}>
            Add Tag
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await tagsService.deleteTags(ids);
        refetch();
      }}
    />
  );
}
