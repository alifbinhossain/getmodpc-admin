import { ReportReasonRecord } from '@/types/report-reason';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const reportReasonColumns: ColumnDef<ReportReasonRecord>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => {
      const isActive = getValue<ReportReasonRecord['is_active']>();
      const variant = isActive ? 'default' : 'destructive';
      return (
        <Badge variant={variant} className='capitalize'>
          {isActive ? 'active' : 'inactive'}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
