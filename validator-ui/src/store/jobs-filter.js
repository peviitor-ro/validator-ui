import { create } from 'zustand';

export const INITIAL_JOBS_STATE = {
    order: 'all',
    filters: [],
    search: '',
};

export const useJobsOptionsStore = create((set) => ({
    ...INITIAL_JOBS_STATE,
    setOrder: (newOreder) => set(() => ({ order: newOreder })),
    setSearch: (searchString) => set(() => ({ search: searchString })),
    reset: () => set(() => ({ ...INITIAL_JOBS_STATE })),
}));
