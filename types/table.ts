// types/table.ts
import type { ColumnDef, Table } from '@tanstack/react-table';

// ─── Permissions ──────────────────────────────────────────────────────────────

export interface TablePermissions {
  canEdit?: boolean;
  canDelete?: boolean;
  canView?: boolean;
  canCreate?: boolean;
}

// ─── Action handlers ──────────────────────────────────────────────────────────

export interface TableActionHandlers<TData> {
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onView?: (row: TData) => void;
  custom?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: TData) => void;
    show?: (row: TData) => boolean;
    variant?: 'default' | 'destructive';
  }>;
}

// ─── Column meta ─────────────────────────────────────────────────────────────

export interface ColumnMeta {
  isStatic?: boolean;
  align?: 'left' | 'center' | 'right';
  hideFromToggle?: boolean;
}

// ─── DataTable props ──────────────────────────────────────────────────────────

export interface DataTableProps<TData extends WithTimestamps> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  isFetching?: boolean;
  title: string;
  description?: string;
  permissions?: TablePermissions;
  actions?: TableActionHandlers<TData>;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  rowCount?: number;
  onStateChange?: (state: TableStateChange) => void;
  enableSearch?: boolean;
  enableColumnToggle?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  searchPlaceholder?: string;
  toolbarExtra?: React.ReactNode;
}

// ─── State ────────────────────────────────────────────────────────────────────

export interface TableStateChange {
  pagination: { pageIndex: number; pageSize: number };
  sorting: Array<{ id: string; desc: boolean }>;
  globalFilter: string;
}

// ─── Row contract ─────────────────────────────────────────────────────────────

export interface WithTimestamps {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── useDataTable return ──────────────────────────────────────────────────────

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}
