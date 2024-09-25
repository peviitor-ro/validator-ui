import { create } from 'zustand';

const INITIAL_SCRAPER_STATE = {
    search: '',
    order: '',
};

export const useScraperStore = create((set) => ({
    ...INITIAL_SCRAPER_STATE,
    setSearch: (search) => set(() => ({ search })),
    setOrder: (order) => set(() => ({ order })),
    reset: () => set(() => ({ ...INITIAL_SCRAPER_STATE })),
}));
