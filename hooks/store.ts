import { create } from "zustand";

interface AdminState {
    isAdmin: boolean;
    setAdmin: (value: boolean) => void;
    toggleAdmin: () => void;
}

const useAdmin = create<AdminState>((set) => ({
    isAdmin: false,
    setAdmin: (value) => set({ isAdmin: value }),
    toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin }))
}))

export default useAdmin;