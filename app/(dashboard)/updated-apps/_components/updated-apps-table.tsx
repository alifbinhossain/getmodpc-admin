'use client';

import { useRouter } from 'next/navigation';

import type { UpdatedAppRecord } from '@/types/app';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { updatedAppsColumns } from '../_config/updated-app-column';

interface UpdatedAppsTableProps {
  data: UpdatedAppRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<UpdatedAppRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function UpdatedAppsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: UpdatedAppsTableProps) {
  const router = useRouter();

  return (
    <DataTable<UpdatedAppRecord>
      data={data}
      columns={updatedAppsColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Updated Apps'
      description='Manage all updated apps.'
      permissions={{ canEdit, canDelete: false, canView: false }}
      actions={{
        onEdit: (raw) => router.push(`/apps/${raw.id}`),
      }}
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by app name, summary or description...'
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          <RefreshCw />
        </Button>
      }
    />
  );
}
