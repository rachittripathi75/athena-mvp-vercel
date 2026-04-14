import { create } from 'zustand'

interface AppState {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedInvoiceId: string | null
  setSelectedInvoiceId: (id: string | null) => void
  isPanelOpen: boolean
  setIsPanelOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'intake',
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedInvoiceId: null,
  setSelectedInvoiceId: (id) => set({ selectedInvoiceId: id }),
  isPanelOpen: false,
  setIsPanelOpen: (open) => set({ isPanelOpen: open }),
}))
