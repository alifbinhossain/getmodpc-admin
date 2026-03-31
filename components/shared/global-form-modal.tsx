'use client';

import { useFormModal } from '@/stores/use-form-modal';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CategoryForm } from '@/app/(dashboard)/categories/_components/category-form';
import { DeveloperForm } from '@/app/(dashboard)/developers/_components/developer-form';
import { FaqForm } from '@/app/(dashboard)/faqs/_components/faq-form';
import { PageForm } from '@/app/(dashboard)/pages/_components/page-form';
import { ReportReasonForm } from '@/app/(dashboard)/report-reasons/_components/report-reason-form';
import { ReportForm } from '@/app/(dashboard)/reports/_components/report-form';
import { TagForm } from '@/app/(dashboard)/tags/_components/tag-form';
import { TestimonialForm } from '@/app/(dashboard)/testimonials/_components/testimonial-form';

import { Separator } from '../ui/separator';

export function GlobalFormModal() {
  const { type, isOpen, closeModal, data } = useFormModal();

  if (!isOpen || !type) return null;

  // Map modal type to form component
  const modalFormMap: Record<string, React.FC<any>> = {
    ADD_REPORT_REASON: ReportReasonForm,
    EDIT_REPORT_REASON: ReportReasonForm,
    EDIT_REPORT: ReportForm,
    EDIT_DEVELOPER: DeveloperForm,
    ADD_DEVELOPER: DeveloperForm,
    EDIT_TAG: TagForm,
    ADD_TAG: TagForm,
    EDIT_CATEGORY: CategoryForm,
    ADD_CATEGORY: CategoryForm,
    ADD_PAGE: PageForm,
    EDIT_PAGE: PageForm,
    ADD_TESTIMONIAL: TestimonialForm,
    EDIT_TESTIMONIAL: TestimonialForm,
    ADD_FAQ: FaqForm,
    EDIT_FAQ: FaqForm,
    // EDIT_USER: EditUserForm,
    // EDIT_APP: EditAppForm,
  };

  const FormComponent = modalFormMap[type];

  if (!FormComponent) return null; //

  const isEditing = type.startsWith('EDIT');

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className='sm:max-w-lg max-h-[90vh] overflow-auto'
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
