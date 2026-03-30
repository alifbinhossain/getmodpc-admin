import { create } from 'zustand';

type ModalType =
  | 'ADD_REPORT_REASON'
  | 'EDIT_REPORT_REASON'
  | 'EDIT_USER'
  | 'EDIT_APP'
  | null;

interface ModalState {
  type: ModalType;
  data: any;
  isOpen: boolean;

  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useFormModal = create<ModalState>((set) => ({
  type: null,
  data: null,
  isOpen: false,

  openModal: (type, data = null) =>
    set({
      type,
      data,
      isOpen: true,
    }),

  closeModal: () =>
    set({
      type: null,
      data: null,
      isOpen: false,
    }),
}));
