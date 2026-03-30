// components/table/DataTable.tsx
'use client';

// Central orchestrator — assembles all sub-components.
// SRP: this component ONLY composes. It owns no state directly —
// all state lives in useDataTable.
import { useMemo } from 'react';

import type { ColumnMeta, DataTableProps, WithTimestamps } from '@/types/table';
import { type ColumnDef, flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { DataTableActions } from './_helpers/data-table-actions';
import { DataTableHeader } from './_helpers/data-table-header';
import { DataTablePagination } from './_helpers/data-table-pagination';
import { DataTableToolbar } from './_helpers/data-table-toolbar';
import { useDataTable } from './useDataTable';

// ─── Static column builders ───────────────────────────────────────────────────
// These are generated per-render via useMemo so they participate in
// TypeScript's generic inference on TData.

function buildSelectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: '_select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label='Select all rows on this page'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label={`Select row ${row.index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      isStatic: true,
      hideFromToggle: true,
      align: 'center',
    } satisfies ColumnMeta,
    size: 40,
  };
}

function buildDateColumn<TData>(
  accessor: 'created_at' | 'updated_at',
  label: string
): ColumnDef<TData> {
  return {
    accessorKey: accessor,
    header: label,
    cell: ({ getValue }) => {
      const raw = getValue<string | undefined>();
      if (!raw) return <span className='text-muted-foreground'>—</span>;
      return (
        <span className='text-sm text-muted-foreground'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(raw))}
        </span>
      );
    },
    meta: {
      isStatic: true,
    } satisfies ColumnMeta,
  };
}

function buildActionsColumn<TData extends WithTimestamps>(
  permissions: DataTableProps<TData>['permissions'],
  actions: DataTableProps<TData>['actions']
): ColumnDef<TData> {
  return {
    id: '_actions',
    header: '',
    cell: ({ row }) => (
      <DataTableActions
        row={row.original}
        permissions={permissions}
        actions={actions}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      isStatic: true,
      hideFromToggle: true,
      align: 'right',
    } satisfies ColumnMeta,
    size: 48,
  };
}

// ─── Sort icon helper ─────────────────────────────────────────────────────────

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ArrowUp className='ml-1.5 h-3.5 w-3.5' />;
  if (sorted === 'desc') return <ArrowDown className='ml-1.5 h-3.5 w-3.5' />;
  return (
    <ArrowUpDown className='ml-1.5 h-3.5 w-3.5 text-muted-foreground/50' />
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function TableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, r) => (
        <TableRow key={r} className='animate-pulse'>
          {Array.from({ length: columnCount }).map((_, c) => (
            <TableCell key={c}>
              <div className='h-4 rounded bg-muted' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<TData extends WithTimestamps>({
  data,
  columns,
  isLoading = false,
  isFetching = false,
  title,
  description,
  permissions,
  actions,
  manualPagination,
  manualSorting,
  manualFiltering,
  rowCount,
  onStateChange,
  enableSearch = true,
  enableColumnToggle = true,
  enablePagination = true,
  enableSorting = true,
  enableRowSelection = false,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  searchPlaceholder,
  toolbarExtra,
}: DataTableProps<TData>) {
  // ── Assemble final column list ─────────────────────────────────────────
  // Order: selection? | user columns | createdAt | updatedAt | actions?
  const finalColumns = useMemo<ColumnDef<TData>[]>(() => {
    const result: ColumnDef<TData>[] = [];

    if (enableRowSelection) {
      result.push(buildSelectionColumn<TData>());
    }

    result.push(...columns);

    // Inject date columns only if TData likely has them
    // (checked at runtime via first data item — safe for static data)
    const sample = data[0] as Record<string, unknown> | undefined;
    if (sample?.created_at !== undefined) {
      result.push(buildDateColumn<TData>('created_at', 'Created At'));
    }
    if (sample?.updated_at !== undefined) {
      result.push(buildDateColumn<TData>('updated_at', 'Updated At'));
    }

    if (
      actions &&
      (permissions?.canEdit || permissions?.canDelete || permissions?.canView)
    ) {
      result.push(buildActionsColumn<TData>(permissions, actions));
    }

    return result;
  }, [columns, enableRowSelection, data, actions, permissions]);

  // ── Table state ────────────────────────────────────────────────────────
  const { table, globalFilter, setGlobalFilter } = useDataTable<TData>({
    data,
    columns: finalColumns,
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount,
    defaultPageSize,
    pageSizeOptions,
    enableRowSelection,
    onStateChange,
  });

  const { rows } = table.getRowModel();
  const headerGroups = table.getHeaderGroups();

  return (
    <div className='space-y-1'>
      {/* Section header */}
      <DataTableHeader title={title} description={description} />

      {/* Toolbar: search + column toggle + extra */}
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        enableSearch={enableSearch}
        enableColumnToggle={enableColumnToggle}
        searchPlaceholder={searchPlaceholder}
        toolbarExtra={toolbarExtra}
      />

      {/* Table */}
      <div className='relative rounded-md border overflow-hidden'>
        {/* Fetching overlay (server-side background refetch indicator) */}
        {isFetching && !isLoading && (
          <div className='absolute right-3 top-3 z-10'>
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          </div>
        )}

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className='hover:bg-transparent bg-slate-50'
                >
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta as
                      | ColumnMeta
                      | undefined;
                    const canSort = enableSorting && header.column.getCanSort();

                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width:
                            header.getSize() !== 150
                              ? header.getSize()
                              : undefined,
                        }}
                        className={cn(
                          'first:pl-4 ',
                          meta?.align === 'right'
                            ? 'text-right'
                            : meta?.align === 'center'
                              ? 'text-center'
                              : ''
                        )}
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            type='button'
                            className='flex items-center gap-0.5 text-xs font-medium uppercase tracking-wide hover:text-foreground transition-colors'
                            onClick={header.column.getToggleSortingHandler()}
                            aria-label={`Sort by ${header.id}`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <SortIcon sorted={header.column.getIsSorted()} />
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton columnCount={finalColumns.length} />
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={finalColumns.length}
                    className='h-32 text-center text-muted-foreground text-sm'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className='group/row transition-colors'
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as
                        | ColumnMeta
                        | undefined;
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            'first:pl-4 ',
                            meta?.align === 'right'
                              ? 'text-right'
                              : meta?.align === 'center'
                                ? 'text-center'
                                : ''
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          ) ??
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <DataTablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          enableRowSelection={enableRowSelection}
        />
      )}
    </div>
  );
}
