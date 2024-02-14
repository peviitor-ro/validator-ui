import { create } from 'zustand';

export const INITIAL_COMPANY_STATE = {
    order: 'name_asc',
    filters: [],
    search: '',
};

export const useCompanyOptionsStore = create((set) => ({
    ...INITIAL_COMPANY_STATE,
    setOrder: (newOreder) => set(() => ({ order: newOreder })),
    setSearch: (searchString) => set(() => ({ search: searchString })),
    reset: () => set(() => ({ ...INITIAL_COMPANY_STATE })),
}));
