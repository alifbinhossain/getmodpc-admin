import { User } from '@/types/auth';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const { name, avatar, email } = row.original;
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className='text-xs'>{initials}</AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='text-sm font-medium truncate'>{name}</p>
            <p className='text-xs text-muted-foreground truncate'>{email}</p>
          </div>
        </div>
      );
    },
    minSize: 200,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => {
      const role = getValue<User['role']>();
      const variantMap: Record<
        User['role'],
        'default' | 'secondary' | 'outline'
      > = {
        admin: 'default',
        manager: 'default',
        super_admin: 'secondary',
        viewer: 'outline',
      };
      return (
        <Badge variant={variantMap[role]} className='capitalize'>
          {role}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
