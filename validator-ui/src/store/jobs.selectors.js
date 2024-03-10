import { INITIAL_JOBS_STATE, useJobsOptionsStore } from './jobs-filter';

export function useJobsOptionsSelector() {
    const order = useJobsOptionsStore((state) => state.order);
    const setOrder = useJobsOptionsStore((state) => state.setOrder);
    const filters = useJobsOptionsStore((state) => state.filters);
    const search = useJobsOptionsStore((state) => state.search);

    const reset = useJobsOptionsStore((state) => state.reset);
    const setSearch = useJobsOptionsStore((state) => state.setSearch);

    const isEmpty = order === INITIAL_JOBS_STATE.order && !filters.length && !search;

    return { order, filters, search, setOrder, reset, setSearch, isEmpty };
}
