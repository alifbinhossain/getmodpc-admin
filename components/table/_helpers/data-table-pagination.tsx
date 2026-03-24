// components/table/DataTablePagination.tsx
'use client';

import type { WithTimestamps } from '@/types/table';
import type { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData extends WithTimestamps> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  enableRowSelection?: boolean;
}

export function DataTablePagination<TData extends WithTimestamps>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  enableRowSelection = false,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4 px-1'>
      {/* Left: selection info or total */}
      <div className='text-xs text-muted-foreground'>
        {enableRowSelection ? (
          <span>
            {selectedCount} of {totalRows} row(s) selected
          </span>
        ) : (
          <span>{totalRows} row(s) total</span>
        )}
      </div>

      <div className='flex items-center gap-4'>
        {/* Page size selector */}
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground whitespace-nowrap'>
            Rows per page
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => {
              table.setPageSize(Number(val));
              table.setPageIndex(0);
            }}
          >
            <SelectTrigger className='h-8 w-16 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)} className='text-xs'>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page indicator */}
        <span className='text-xs text-muted-foreground whitespace-nowrap'>
          Page {pageIndex + 1} of {table.getPageCount() || 1}
        </span>

        {/* Navigation controls */}
        <div className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to first page'
          >
            <ChevronsLeft className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label='Go to previous page'
          >
            <ChevronLeft className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label='Go to next page'
          >
            <ChevronRight className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label='Go to last page'
          >
            <ChevronsRight className='h-3.5 w-3.5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
