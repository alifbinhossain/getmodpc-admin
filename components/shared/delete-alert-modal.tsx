'use client';
import React from 'react';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
  onSubmit: () => Promise<void>;
  open: boolean;
  setOpen: (open: boolean) => void;
};
function DeleteAlertModal({ onSubmit, open, setOpen }: Props) {
  const [loading, setLoading] = React.useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } catch (error: any) {
      toast.error(
        error?.message ??
          error?.response?.message ??
          'Something went wrong. Could not delete item.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className='cursor-pointer'>
            Cancel
          </AlertDialogCancel>

          <Button
            disabled={loading}
            onClick={handleConfirmDelete}
            className='bg-destructive! cursor-pointer text-white hover:bg-destructive/90'
          >
            {loading ? 'Deleting...' : 'Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertModal;
