'use client';
import { useTablePagination } from '@/stores/use-table-pagination';
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
  const { page, limit, setPage, setLimit } = useTablePagination();
  const { pageIndex } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4 px-1'>
      <div className='text-xs text-muted-foreground'>
        {enableRowSelection
          ? `${selectedCount} of ${totalRows} row(s) selected`
          : `${totalRows} row(s) total`}
      </div>

      <div className='flex items-center gap-4'>
        {/* Page size selector */}
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground whitespace-nowrap'>
            Rows per page
          </span>
          <Select
            value={String(limit)}
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1);
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

        {/* Navigation */}
        <div className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => {
              setPage(1);
              table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => {
              setPage(page - 1);
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => {
              setPage(page + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='h-3.5 w-3.5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => {
              const lastPage = table.getPageCount();
              setPage(lastPage);
              table.setPageIndex(lastPage - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='h-3.5 w-3.5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
