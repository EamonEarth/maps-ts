import { create } from 'zustand'

interface useMobileSidebarStore { 
isOpen: boolean;
toggleSidebar: () => void;
}

export const useMobileSidebar = create<useMobileSidebarStore>((set)=>({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}))