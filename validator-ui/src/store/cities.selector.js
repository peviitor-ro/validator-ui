import { useCitiesStore } from './cities.state';

export function useCitiesSelector() {
    const search = useCitiesStore((state) => state.search);
    const setSearch = useCitiesStore((state) => state.setSearch);
    const reset = useCitiesStore((state) => state.reset);

    return { search, setSearch, reset };
}