import { INITIAL_COMPANY_STATE, useCompanyOptionsStore } from './company-filters';

export function useCompanyOptionsSelector() {
    const order = useCompanyOptionsStore((state) => state.order);
    const setOrder = useCompanyOptionsStore((state) => state.setOrder);
    const filters = useCompanyOptionsStore((state) => state.filters);
    const search = useCompanyOptionsStore((state) => state.search);

    const reset = useCompanyOptionsStore((state) => state.reset);

    const isEmpty = order === INITIAL_COMPANY_STATE.order && !filters.length && !search;

    return { order, filters, search, setOrder, reset, isEmpty };
}
