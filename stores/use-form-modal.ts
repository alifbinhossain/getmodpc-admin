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

  openModal: (type: ModalType, data?: any, refreshData?: () => void) => void;
  closeModal: (isRefreshData?: boolean) => void;
  refreshData: (() => void) | null;
}

export const useFormModal = create<ModalState>((set, get) => ({
  type: null,
  data: null,
  isOpen: false,
  refreshData: null,

  openModal: (type, data = null, refreshData) =>
    set({
      type,
      data,
      isOpen: true,
      refreshData,
    }),

  closeModal: (isRefreshData) => {
    if (isRefreshData) {
      const fn = get().refreshData;
      if (fn) fn();
    }
    set({
      type: null,
      data: null,
      isOpen: false,
      refreshData: null,
    });
  },
}));
