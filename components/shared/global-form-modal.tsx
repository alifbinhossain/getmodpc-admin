'use client';

import { useFormModal } from '@/stores/use-form-modal';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AdForm } from '@/app/(dashboard)/ads/_components/ad-form';
import { CategoryForm } from '@/app/(dashboard)/categories/_components/category-form';
import { CommentForm } from '@/app/(dashboard)/comments/_components/comment-form';
import { ContactForm } from '@/app/(dashboard)/contacts/_components/contact-form';
import { DeveloperForm } from '@/app/(dashboard)/developers/_components/developer-form';
import { FaqForm } from '@/app/(dashboard)/faqs/_components/faq-form';
import RenameMediaForm from '@/app/(dashboard)/medias/_components/rename-media-form';
import { PageForm } from '@/app/(dashboard)/pages/_components/page-form';
import { ReportReasonForm } from '@/app/(dashboard)/report-reasons/_components/report-reason-form';
import { ReportForm } from '@/app/(dashboard)/reports/_components/report-form';
import { TagForm } from '@/app/(dashboard)/tags/_components/tag-form';
import { TestimonialForm } from '@/app/(dashboard)/testimonials/_components/testimonial-form';
import { UserAppRequestForm } from '@/app/(dashboard)/user-app-requests/_components/user-app-request-form';

import { UploadTab } from '../media';
import { Separator } from '../ui/separator';
import CreateFolderForm from '../media/create-folder-form';

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
    ADD_MEDIA: UploadTab,
    ADD_AD: AdForm,
    EDIT_AD: AdForm,
    ADD_COMMENT: CommentForm,
    EDIT_COMMENT: CommentForm,
    EDIT_CONTACT: ContactForm,
    EDIT_USER_APP_REQUEST: UserAppRequestForm,
    RENAME_FILE: RenameMediaForm,
    RENAME_FOLDER: RenameMediaForm,
    CREATE_FOLDER:CreateFolderForm
    // EDIT_USER: EditUserForm,
  };

  const FormComponent = modalFormMap[type];

  if (!FormComponent) return null; //

  const isEditing = type.startsWith('EDIT');
  const isRename = type === 'RENAME_FILE' || type === 'RENAME_FOLDER';

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className={'max-h-[90vh] overflow-auto sm:max-w-lg'}
        aria-describedby={`${type}-form-modal-description`}
      >
        <DialogHeader>
          <DialogTitle className='uppercase'>
            {type.split('_').join(' ') + ' Form'}
          </DialogTitle>
        </DialogHeader>

        <Separator />
        {isRename ? (
          <RenameMediaForm
            data={data}
            onClose={closeModal}
            isFolder={type === 'RENAME_FOLDER'}
          />
        ) : (
          <FormComponent
            data={data}
            onClose={closeModal}
            isEditing={isEditing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
