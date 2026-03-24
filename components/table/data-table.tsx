'use client';

import {
  type ColumnDef,
  flexRender,
  type Table as TanstackTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Search,
  Settings2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

// =============================================================================
// TABLE TYPES
// =============================================================================

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columns: ColumnDef<TData, unknown>[];
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
}

// =============================================================================
// SORT ICON HELPER
// =============================================================================

function SortIcon({ direction }: { direction: false | 'asc' | 'desc' }) {
  if (direction === 'asc') return <ChevronUp className='ml-1 h-4 w-4' />;
  if (direction === 'desc') return <ChevronDown className='ml-1 h-4 w-4' />;
  return <ChevronsUpDown className='ml-1 h-4 w-4 opacity-40' />;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function DataTable<TData>({
  table,
  globalFilter,
  onGlobalFilterChange,
  isLoading,
  emptyMessage = 'No results found.',
  toolbar,
}: DataTableProps<TData>) {
  return (
    <div className='space-y-4'>
      {/* Toolbar */}
      <div className='flex items-center justify-between gap-4'>
        {/* Global Search */}
        {onGlobalFilterChange && (
          <div className='relative max-w-sm flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search...'
              value={globalFilter ?? ''}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
              className='pl-9'
            />
          </div>
        )}

        <div className='ml-auto flex items-center gap-2'>
          {toolbar}

          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                <Settings2 className='h-4 w-4' />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-45'>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuItem
                    key={col.id}
                    className='cursor-pointer capitalize'
                    onClick={() => col.toggleVisibility(!col.getIsVisible())}
                  >
                    <span
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded border text-xs',
                        col.getIsVisible()
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input'
                      )}
                    >
                      {col.getIsVisible() && '✓'}
                    </span>
                    {col.id}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-md border'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            {/* Head */}
            <thead className='bg-muted/50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='h-11 px-4 text-left align-middle font-medium text-muted-foreground'
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            'flex items-center',
                            header.column.getCanSort() &&
                              'cursor-pointer select-none transition-colors hover:text-foreground'
                          )}
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <SortIcon direction={header.column.getIsSorted()} />
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody className='divide-y divide-border'>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className='animate-pulse'>
                    {table.getAllColumns().map((col) => (
                      <td key={col.id} className='px-4 py-3'>
                        <div className='h-4 rounded bg-muted' />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className='h-32 text-center text-muted-foreground'
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className='transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted'
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='px-4 py-3 align-middle'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}

// =============================================================================
// PAGINATION SUB-COMPONENT
// =============================================================================

function DataTablePagination<TData>({
  table,
}: {
  table: TanstackTable<TData>;
}) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className='flex items-center justify-between px-1'>
      <div className='text-sm text-muted-foreground'>
        {selectedCount > 0 ? (
          <span>
            {selectedCount} of {totalCount} row(s) selected.
          </span>
        ) : (
          <span>{totalCount} total row(s)</span>
        )}
      </div>

      <div className='flex items-center gap-6'>
        {/* Rows per page */}
        <div className='flex items-center gap-2 text-sm'>
          <span className='text-muted-foreground'>Rows per page</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className='h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring'
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Page info */}
        <span className='text-sm text-muted-foreground'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {Math.max(1, table.getPageCount())}
        </span>

        {/* Nav buttons */}
        <div className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>First page</span>«
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Previous page</span>‹
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Next page</span>›
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Last page</span>»
          </Button>
        </div>
      </div>
    </div>
  );
}
