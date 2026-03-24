// components/table/DataTableColumnToggle.tsx
'use client';

import type { ColumnMeta, WithTimestamps } from '@/types/table';
import type { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableColumnToggleProps<TData extends WithTimestamps> {
  table: Table<TData>;
}

export function DataTableColumnToggle<TData extends WithTimestamps>({
  table,
}: DataTableColumnToggleProps<TData>) {
  const toggleableColumns = table.getAllColumns().filter((col) => {
    const meta = col.columnDef.meta as ColumnMeta | undefined;
    return col.getCanHide() && !meta?.hideFromToggle;
  });

  if (toggleableColumns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 gap-1.5'>
          <Settings2 className='h-3.5 w-3.5' />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-44'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {toggleableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className='capitalize'
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {/* Use header string if available, fall back to id */}
            {typeof column.columnDef.header === 'string'
              ? column.columnDef.header
              : column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
