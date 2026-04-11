'use client';

import { useEffect, useState } from 'react';

import { INotification } from '@/types/notification';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

import DeleteAlertModal from '../shared/delete-alert-modal';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import Notification from './notification';
import NotificationSkeleton from './notification-skeleton';
import { useGetAllNotifications } from './notification.hooks';
import { notificationService } from './notification.service';

function Notifications() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [totalUnread, setTotalUnread] = useState(0);

  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);

  const { data, isLoading, refetch } = useGetAllNotifications(true, {
    page,
  });

  // ✅ Append notifications
  useEffect(() => {
    if (data?.data) {
      const newNotifications = data.data.notifications ?? [];
      setTotalUnread(data.data.totalUnreadCount ?? 0);
      setAllNotifications((prev) =>
        page === 1 ? newNotifications : [...prev, ...newNotifications]
      );
    }
  }, [data, page]);

  // ✅ Mark as read
  const handleMarkAsRead = async (id?: string) => {
    try {
      setIsPending(true);

      if (id) {
        await notificationService.markAsRead(id);
      } else {
        await notificationService.markAllAsRead();
      }

      toast.success('Marked as read successfully');

      // 🔥 reset + refetch
      setPage(1);
      setAllNotifications([]);
      refetch();
    } catch (err: any) {
      toast.error(
        err?.message ?? err?.response?.message ?? 'Internal Server Error'
      );
    } finally {
      setIsPending(false);
    }
  };

  // ✅ Delete (single or all)
  const handleDelete = async () => {
    try {
      setIsPending(true);

      if (selectedId) {
        await notificationService.deleteNotification(selectedId);
        setSelectedId(null);
      } else {
        await notificationService.deleteAllNotifications();
      }

      toast.success('Deleted successfully');
      setOpenDeleteModal(false);

      // 🔥 reset + refetch
      setPage(1);
      setAllNotifications([]);
      refetch();
    } catch (err: any) {
      toast.error(
        err?.message ?? err?.response?.message ?? 'Internal Server Error'
      );
    } finally {
      setIsPending(false);
    }
  };

  // ✅ Load more
  const handleLoadMore = () => {
    if (data?.meta?.hasNextPage && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon' className='relative h-9 w-9'>
          <Bell className='h-4 w-4' />
          {totalUnread > 0 && (
            <span className='absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white'>
              {totalUnread > 99 ? '99+' : totalUnread}
            </span>
          )}
          <span className='sr-only'>Notifications</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-100 p-0' align='end'>
        {/* 🔝 Header */}
        <div className='flex items-center justify-between p-4 pb-0'>
          <Button
            size='sm'
            disabled={isPending || isLoading || allNotifications.length === 0}
            onClick={() => handleMarkAsRead()}
          >
            Mark All Read
          </Button>

          <Button
            size='sm'
            variant='destructive'
            disabled={isPending || isLoading || allNotifications.length === 0}
            onClick={() => {
              setSelectedId(null); // delete all
              setOpenDeleteModal(true);
            }}
          >
            Delete All
          </Button>
        </div>

        <Separator />

        {/* 📄 List */}
        <div className='max-h-130 overflow-y-auto p-2 flex flex-col gap-2'>
          {/* 🔄 Initial loading */}
          {isLoading && page === 1 ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <NotificationSkeleton key={i} />
              ))}
            </>
          ) : allNotifications.length > 0 ? (
            <>
              {allNotifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  onDelete={() => {
                    setSelectedId(notification.id);
                    setOpenDeleteModal(true);
                  }}
                  onMarkAsRead={() => handleMarkAsRead(notification.id)}
                  setOpen={setOpen}
                />
              ))}

              {/* 🔽 Load More */}
              {data?.meta?.hasNextPage && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className='mt-2'
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </>
          ) : (
            <p className='text-center text-sm text-muted-foreground py-6'>
              No notifications
            </p>
          )}
        </div>

        {/* ❗ Delete Modal */}
        <DeleteAlertModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={handleDelete}
        />
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
