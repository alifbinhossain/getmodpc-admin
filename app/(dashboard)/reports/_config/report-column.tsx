import { EnumReportStatus, ReportRecord } from '@/types/report';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const reportColumns: ColumnDef<ReportRecord>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ getValue }) => {
      const reason = getValue<ReportRecord['reason']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {reason?.title}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ getValue }) => {
      const details = getValue<ReportRecord['details']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<ReportRecord['status']>();
      const variant =
        status === EnumReportStatus.OPEN
          ? 'default'
          : EnumReportStatus.DECLINED === status
            ? 'destructive'
            : 'secondary';
      return (
        <Badge variant={variant} className='capitalize'>
          {status}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
