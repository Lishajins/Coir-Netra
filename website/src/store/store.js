import { create } from 'zustand';

// Auth store
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login: (userData) => set({ user: userData, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));

// Search store
export const useSearchStore = create((set) => ({
    query: '',
    setQuery: (q) => set({ query: q }),
    clearQuery: () => set({ query: '' }),
}));

// Filter store
export const useFilterStore = create((set) => ({
    location: '',
    minPrice: '',
    maxPrice: '',
    minQty: '',
    setLocation: (v) => set({ location: v }),
    setMinPrice: (v) => set({ minPrice: v }),
    setMaxPrice: (v) => set({ maxPrice: v }),
    setMinQty: (v) => set({ minQty: v }),
    clearFilters: () => set({ location: '', minPrice: '', maxPrice: '', minQty: '' }),
}));
