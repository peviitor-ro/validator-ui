import { useScraperStore } from './scraper.state';

export function useScraperSelector() {
    const search = useScraperStore((state) => state.search);
    const order = useScraperStore((state) => state.order);
    const setSearch = useScraperStore((state) => state.setSearch);
    const setOrder = useScraperStore((state) => state.setOrder);
    const reset = useScraperStore((state) => state.reset);
    return {
        search,
        order,
        setSearch,
        setOrder,
        reset,
    };
}
