'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { CategoryRecord } from '@/types/category';
import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { categoriesService } from '../_config/categories.service';
import { categoryColumns } from '../_config/category-column';

interface CategoriesTableProps {
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

export function CategoriesTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: CategoriesTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<CategoryRecord>
      data={data}
      columns={categoryColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Categories'
      description='Manage all category.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (category) => router.push(`/categories/${category.id}`),
        onEdit: (raw) => {
          openModal('EDIT_CATEGORY', raw, refetch);
        },
        onDelete: async (category) => {
          await categoriesService.deleteCategory(category.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by name or description...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_CATEGORY', null, refetch)}>
            Add Category
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await categoriesService.deleteCategories(ids);
        refetch();
      }}
    />
  );
}
