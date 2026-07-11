import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppShellState = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
};

export const useAppShellStore = create<AppShellState>()(
  persist(
    (set) => ({
      open: true,
      setOpen: (open) => set({ open }),
      toggle: () => set((state) => ({ open: !state.open })),
    }),
    {
      name: 'app-shell',
    }
  )
);

export function useAppShellOpen() {
  return useAppShellStore((state) => state.open);
}
