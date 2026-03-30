'use client';

import { useFormModal } from '@/stores/use-form-modal';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ReportReasonForm } from '@/app/(dashboard)/report-reasons/_components/report-reason-form';

import { Separator } from '../ui/separator';

export function GlobalFormModal() {
  const { type, isOpen, closeModal, data } = useFormModal();

  if (!isOpen || !type) return null;

  // Map modal type to form component
  const modalFormMap: Record<string, React.FC<any>> = {
    ADD_REPORT_REASON: ReportReasonForm,
    EDIT_REPORT_REASON: ReportReasonForm,
    // EDIT_USER: EditUserForm,
    // EDIT_APP: EditAppForm,
  };

  const FormComponent = modalFormMap[type];

  if (!FormComponent) return null; //

  const isEditing = type.startsWith('EDIT');

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className='sm:max-w-md'
        aria-describedby={`${type}-form-modal-description`}
      >
        <DialogHeader>
          <DialogTitle className='uppercase'>
            {type.split('_').join(' ') + ' Form'}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <FormComponent data={data} onClose={closeModal} isEditing={isEditing} />
      </DialogContent>
    </Dialog>
  );
}
