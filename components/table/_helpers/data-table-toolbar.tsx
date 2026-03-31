// components/table/DataTableToolbar.tsx
'use client';

import { useState } from 'react';

import type { WithTimestamps } from '@/types/table';
import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import DeleteAlertModal from '@/components/shared/delete-alert-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableColumnToggle } from './data-table-column-toggle';

interface DataTableToolbarProps<TData extends WithTimestamps> {
  table: Table<TData>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  enableSearch?: boolean;
  enableColumnToggle?: boolean;
  searchPlaceholder?: string;
  toolbarExtra?: React.ReactNode;
  deleteBulkAction?: (ids: string[]) => Promise<void>;
}

export function DataTableToolbar<TData extends WithTimestamps>({
  table,
  globalFilter,
  onGlobalFilterChange,
  enableSearch = true,
  enableColumnToggle = true,
  searchPlaceholder = 'Search...',
  toolbarExtra,
  deleteBulkAction,
}: DataTableToolbarProps<TData>) {
  const hasActiveFilters = globalFilter.length > 0;
  const [open, setOpen] = useState(false);
  const selectedRows = table.getSelectedRowModel().rows;
  const ids = selectedRows.map(
    (row) => (row.original.id || row.original.key) as string
  );

  return (
    <>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
        {/* Left: search */}
        <div className='flex flex-1 items-center gap-2 max-w-sm'>
          {enableSearch && (
            <div className='relative flex-1'>
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange(e.target.value)}
                className='h-9'
                aria-label='Search table'
              />
              {hasActiveFilters && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-0 top-0 h-8 w-8 text-muted-foreground hover:text-foreground'
                  onClick={() => onGlobalFilterChange('')}
                  aria-label='Clear search'
                >
                  <X className='h-3.5 w-3.5' />
                </Button>
              )}
            </div>
          )}

          {/* Reset all filters button */}
          {hasActiveFilters && (
            <Button
              variant='ghost'
              size='sm'
              className='h-8 px-2 text-xs text-muted-foreground'
              onClick={() => {
                onGlobalFilterChange('');
                table.resetColumnFilters();
              }}
            >
              Reset
            </Button>
          )}
        </div>

        {/* Right: extra slot + column toggle */}
        <div className='flex items-center gap-2'>
          {toolbarExtra}
          {selectedRows.length > 0 && (
            <Button variant='destructive' onClick={() => setOpen(true)}>
              Delete ({selectedRows.length})
            </Button>
          )}
          {enableColumnToggle && <DataTableColumnToggle table={table} />}
        </div>
      </div>
      <DeleteAlertModal
        open={open}
        setOpen={setOpen}
        onSubmit={async () => {
          await deleteBulkAction?.(ids);
          table.resetRowSelection();
        }}
      />
    </>
  );
}
