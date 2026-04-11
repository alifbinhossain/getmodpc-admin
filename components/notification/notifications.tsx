'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import { INotification } from '@/types/notification';
import { toast } from 'sonner';

import DeleteAlertModal from '../shared/delete-alert-modal';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import Notification from './notification';
import NotificationSkeleton from './notification-skeleton';
import { useGetAllNotifications } from './notification.hooks';
import { notificationService } from './notification.service';

type Props = {
  trigger: ReactNode;
};

function Notifications({ trigger }: Props) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);

  const { data, isLoading, refetch } = useGetAllNotifications(open, {
    page,
  });

  // ✅ Reset when popover opens
  useEffect(() => {
    if (open) {
      setPage(1);
      setAllNotifications([]);
    }
  }, [open]);

  // ✅ Append notifications
  useEffect(() => {
    if (data?.data) {
      const newNotifications = data.data.notifications ?? [];

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
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent className='w-100 p-0'>
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
