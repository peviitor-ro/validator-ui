import { create } from 'zustand';

export const INITIAL_CITIES_STATE = {
    search: '',
};

export const useCitiesStore = create((set) => ({
    ...INITIAL_CITIES_STATE,
    setSearch: (searchString) => set(() => ({ search: searchString })),
    reset: () => set(() => ({ ...INITIAL_CITIES_STATE })),
}));
