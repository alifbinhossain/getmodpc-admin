// hooks/table/use-data-table.ts
//
// SRP: owns ALL table state (pagination, sorting, filtering, column visibility,
// row selection). Components only read from `table` — no local state needed.

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  DataTableProps,
  UseDataTableReturn,
  WithTimestamps,
} from '@/types/table';
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

// ─── Debounce helper ──────────────────────────────────────────────────────────
// Kept module-local to avoid a library dependency for a 10-line function.

function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// ─── useDataTable ─────────────────────────────────────────────────────────────

export function useDataTable<TData extends WithTimestamps>({
  data,
  columns,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  rowCount,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  enableRowSelection = false,
  onStateChange,
}: Pick<
  DataTableProps<TData>,
  | 'data'
  | 'columns'
  | 'manualPagination'
  | 'manualSorting'
  | 'manualFiltering'
  | 'rowCount'
  | 'defaultPageSize'
  | 'pageSizeOptions'
  | 'enableRowSelection'
  | 'onStateChange'
>): UseDataTableReturn<TData> {
  // ── Core state ───────────────────────────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedFilter = useDebounce(globalFilter, 300);

  // ── Notify parent on state changes (server-side mode) ────────────────────
  // Use ref to hold onStateChange so it never triggers the effect loop
  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;

  useEffect(() => {
    if (!onStateChangeRef.current) return;
    onStateChangeRef.current({
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      sorting: sorting.map((s) => ({ id: s.id, desc: s.desc })),
      globalFilter: debouncedFilter,
    });
  }, [pagination, sorting, debouncedFilter]);

  // ── Memoize data and columns to avoid unnecessary re-renders ─────────────
  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(() => columns, [columns]);

  const table = useReactTable<TData>({
    data: memoData,
    columns: memoColumns,
    // Row counting for server pagination
    ...(manualPagination && rowCount !== undefined ? { rowCount } : {}),
    // State
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: debouncedFilter,
    },
    // Mode flags
    manualPagination,
    manualSorting,
    manualFiltering,
    // Handlers
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onPaginationChange: setPagination,
    onGlobalFilterChange: (value) => setGlobalFilter(String(value ?? '')),
    // Row models — only include what's needed to keep the bundle lean
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Debug only in development
    debugTable: process.env.NODE_ENV === 'development',
  });

  const handleSetGlobalFilter = useCallback((value: string) => {
    setGlobalFilter(value);
    // Reset to first page on new search
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  return { table, globalFilter, setGlobalFilter: handleSetGlobalFilter };
}
