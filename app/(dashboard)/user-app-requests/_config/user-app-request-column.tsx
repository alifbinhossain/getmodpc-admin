import type { ColumnMeta } from '@/types/table';
import {
  EnumUserAppRequestStatus,
  type UserAppRequestRecord,
} from '@/types/user-app-request';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const userAppRequestColumns: ColumnDef<UserAppRequestRecord>[] = [
  {
    accessorKey: 'app_name',
    header: 'App Name',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'app_url',
    header: 'App URL',
    cell: ({ getValue }) => {
      const appUrl = getValue<UserAppRequestRecord['app_url']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {appUrl}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<UserAppRequestRecord['status']>();
      const variant =
        status === EnumUserAppRequestStatus.PENDING
          ? 'secondary'
          : status === EnumUserAppRequestStatus.RESOLVED
            ? 'default'
            : 'destructive';
      return (
        <Badge variant={variant} className='capitalize'>
          {status}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
