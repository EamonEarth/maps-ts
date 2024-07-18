import { create } from 'zustand'

interface useRelationModalStore { 
isOpen: boolean;
onOpen: () => void;
onClose: () => void;
}

export const useRelationModal = create<useRelationModalStore>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))