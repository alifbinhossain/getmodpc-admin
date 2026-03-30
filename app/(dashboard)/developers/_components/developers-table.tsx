'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { DeveloperRecord } from '@/types/developer';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { developerColumns } from '../_config/developer-column';
import { developersService } from '../_config/developers.service';

interface DevelopersTableProps {
  data: DeveloperRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<DeveloperRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function DevelopersTable({
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
    <DataTable<DeveloperRecord>
      data={data}
      columns={developerColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Developers'
      description='Manage all developer.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (developer) => router.push(`/developers/${developer.id}`),
        onEdit: (raw) => {
          openModal('EDIT_DEVELOPER', raw, refetch);
        },
        onDelete: async (developer) => {
          await developersService.deleteDeveloper(developer.id);
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
          <Button onClick={() => openModal('ADD_DEVELOPER', null, refetch)}>
            Add Developer
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await developersService.deleteDevelopers(ids);
        refetch();
      }}
    />
  );
}
