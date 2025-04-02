import { create } from 'zustand';

export const useGameStore = create((set) => ({
  showSopa: false,
  toggleSopa: () => set((state) => ({ showSopa: !state.showSopa })),
}));
