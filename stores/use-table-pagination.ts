// stores/tablePagination.ts
import { create } from 'zustand';

interface TablePaginationState {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
  searchTerm?: string;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSortBy: (sort_by: string) => void;
  setSortOrder: (sort_order: 'ASC' | 'DESC') => void;
  reset: () => void;

  // New helper: return only defined values
  getDefinedParams: () => Partial<Omit<TablePaginationState, 'setPage' | 'setLimit' | 'setSearchTerm' | 'setSortBy' | 'setSortOrder' | 'reset' | 'getDefinedParams'>>;
}

export const useTablePagination = create<TablePaginationState>((set, get) => ({
  page: 1,
  limit: 20,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSortBy: (sort_by) => set({ sort_by }),
  setSortOrder: (sort_order) => set({ sort_order }),
  reset: () =>
    set({
      page: 1,
      limit: 20,
      sort_by: undefined,
      sort_order: undefined,
      searchTerm: undefined,
    }),
  
  // Return only defined values
  getDefinedParams: () => {
    const { page, limit, sort_by, sort_order, searchTerm } = get();
    return Object.fromEntries(
      Object.entries({ page, limit, sort_by, sort_order, searchTerm }).filter(
        ([_, value]) => value !== undefined
      )
    ) as Partial<Omit<TablePaginationState, 'setPage' | 'setLimit' | 'setSearchTerm' | 'setSortBy' | 'setSortOrder' | 'reset' | 'getDefinedParams'>>;
  },
}));