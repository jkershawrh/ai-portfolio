import { create } from 'zustand'

interface PortfolioState {
  selectedId: string | null
  activeLayer: number | null
  showProducts: boolean
  showHardware: boolean
  showOss: boolean
  setSelected: (id: string | null) => void
  setActiveLayer: (layer: number | null) => void
  toggleProducts: () => void
  toggleHardware: () => void
  toggleOss: () => void
  resetFilters: () => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedId: null,
  activeLayer: null,
  showProducts: false,
  showHardware: false,
  showOss: false,
  setSelected: (id) => set({ selectedId: id }),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  toggleProducts: () => set((s) => ({ showProducts: !s.showProducts })),
  toggleHardware: () => set((s) => ({ showHardware: !s.showHardware })),
  toggleOss: () => set((s) => ({ showOss: !s.showOss })),
  resetFilters: () =>
    set({
      selectedId: null,
      activeLayer: null,
      showProducts: false,
      showHardware: false,
      showOss: false,
    }),
}))
