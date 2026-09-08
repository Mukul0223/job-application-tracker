import { create } from 'zustand';

const useUiStore = create((set) => ({
  // State
  isSidebarCollapsed: false,
  activeModal: null,
  isFiltersPanelOpen: false,

  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  openModal: (modalName) => set({ activeModal: modalName }),

  closeModal: () => set({ activeModal: null }),

  toggleFiltersPanel: () =>
    set((state) => ({ isFiltersPanelOpen: !state.isFiltersPanelOpen })),
}));

export default useUiStore;
