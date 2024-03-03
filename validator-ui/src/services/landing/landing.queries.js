import { useInfiniteQuery } from '@tanstack/react-query';
import { getCompanies } from './landing.service';

export function useCompaniesInfiniteQuery(size, order, search) {
    return useInfiniteQuery({
        queryKey: ['projects', order, search],
        queryFn: ({ pageParam }) => getCompanies(pageParam, size, order, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
