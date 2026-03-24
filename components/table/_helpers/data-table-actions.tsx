// components/table/DataTableActions.tsx
'use client';

import type { TableActionHandlers, TablePermissions } from '@/types/table';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableActionsProps<TData> {
  row: TData;
  permissions?: TablePermissions;
  actions?: TableActionHandlers<TData>;
}

export function DataTableActions<TData>({
  row,
  permissions = { canEdit: true, canDelete: true, canView: false },
  actions,
}: DataTableActionsProps<TData>) {
  // Determine if ANY action is available — if not, render nothing
  const hasBuiltInActions =
    (permissions.canView && actions?.onView) ||
    (permissions.canEdit && actions?.onEdit) ||
    (permissions.canDelete && actions?.onDelete);

  const visibleCustomActions =
    actions?.custom?.filter((a) => (a.show ? a.show(row) : true)) ?? [];

  if (!hasBuiltInActions && visibleCustomActions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 p-0 focus-visible:ring-1'
          aria-label='Open row actions'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View */}
        {permissions.canView && actions?.onView && (
          <DropdownMenuItem
            onClick={() => actions.onView!(row)}
            className='gap-2 cursor-pointer'
          >
            <Eye className='h-3.5 w-3.5 text-muted-foreground' />
            View
          </DropdownMenuItem>
        )}

        {/* Edit */}
        {permissions.canEdit && actions?.onEdit && (
          <DropdownMenuItem
            onClick={() => actions.onEdit!(row)}
            className='gap-2 cursor-pointer'
          >
            <Pencil className='h-3.5 w-3.5 text-muted-foreground' />
            Edit
          </DropdownMenuItem>
        )}

        {/* Custom actions */}
        {visibleCustomActions.length > 0 && (
          <>
            {(permissions.canView || permissions.canEdit) && (
              <DropdownMenuSeparator />
            )}
            {visibleCustomActions.map((action) => (
              <DropdownMenuItem
                key={action.label}
                onClick={() => action.onClick(row)}
                className={`gap-2 cursor-pointer ${
                  action.variant === 'destructive'
                    ? 'text-destructive focus:text-destructive'
                    : ''
                }`}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {/* Delete — always last, always destructive */}
        {permissions.canDelete && actions?.onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => actions.onDelete!(row)}
              className='gap-2 cursor-pointer text-destructive focus:text-destructive'
            >
              <Trash2 className='h-3.5 w-3.5' />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
