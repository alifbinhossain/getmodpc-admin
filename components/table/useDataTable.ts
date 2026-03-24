import { useState } from 'react';

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

// =============================================================================
// useDataTable — reusable TanStack Table abstraction
// =============================================================================

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pageSize?: number;
  // For server-side pagination
  manualPagination?: boolean;
  pageCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
}

export function useDataTable<TData>({
  data,
  columns,
  pageSize = 10,
  manualPagination = false,
  pageCount,
  onPaginationChange,
  onSortingChange,
  onFilterChange,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    // Server-side support
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    manualSorting: !!onSortingChange,
    manualFiltering: !!onFilterChange,

    // Row selection
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,

    // Sorting
    onSortingChange: (updater) => {
      setSorting(updater);
      if (onSortingChange) {
        const newSorting =
          typeof updater === 'function' ? updater(sorting) : updater;
        onSortingChange(newSorting);
      }
    },

    // Filtering
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      if (onFilterChange) {
        const newFilters =
          typeof updater === 'function' ? updater(columnFilters) : updater;
        onFilterChange(newFilters);
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,

    // Pagination
    onPaginationChange: (updater) => {
      setPagination(updater);
      if (onPaginationChange) {
        const newPagination =
          typeof updater === 'function' ? updater(pagination) : updater;
        onPaginationChange(newPagination);
      }
    },

    // Row models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  return {
    table,
    selectedRows,
    globalFilter,
    setGlobalFilter,
    pagination,
    sorting,
    columnFilters,
  };
}
