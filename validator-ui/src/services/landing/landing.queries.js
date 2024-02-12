import { useInfiniteQuery } from '@tanstack/react-query';
import { getCompanies } from './landing.service';

export function useCompaniesInfiniteQuery(size, order) {
    return useInfiniteQuery({
        queryKey: ['projects', order],
        queryFn: ({ pageParam }) => getCompanies(pageParam, size, order),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
