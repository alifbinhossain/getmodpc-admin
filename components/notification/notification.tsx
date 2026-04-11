'use client';

import { useRouter } from 'next/navigation';

import { INotification } from '@/types/notification';
import { CheckCheck, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  notification: INotification;
  onDelete?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  setOpen: (open: boolean) => void;
};

export default function Notification({
  notification,
  onDelete,
  onMarkAsRead,
  setOpen,
}: Props) {
  const router = useRouter();

  const handleNavigate = () => {
    if (notification.app_id) {
      setOpen(false);
      router.push(`/apps/${notification.app_id}`);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={cn(
        'relative flex items-start justify-between gap-4 rounded-xl border p-4 transition-all cursor-pointer',
        'hover:bg-muted/50'
      )}
    >
      {/* 🔴 Unread Dot */}
      {!notification.is_read && (
        <span className='absolute left-2 top-2 flex h-3 w-3'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-red-600' />
        </span>
      )}

      {/* 📄 Content */}
      <div className='flex flex-col gap-1'>
        <h3 className='text-sm font-semibold'>{notification.title}</h3>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {notification.message}
        </p>
      </div>

      {/* ⚙️ Actions */}
      <div
        className='flex flex-col items-center gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mark as Read */}
        {!notification.is_read && (
          <button
            onClick={() => onMarkAsRead?.(notification.id)}
            className='rounded-md p-2 cursor-pointer hover:bg-green-100 transition'
          >
            <CheckCheck className='h-4 w-4 text-green-600' />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete?.(notification.id)}
          className='rounded-md p-2 hover:bg-red-100 transition cursor-pointer'
        >
          <Trash2 className='h-4 w-4 text-red-600' />
        </button>
      </div>
    </div>
  );
}
