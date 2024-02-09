import { useInfiniteQuery } from '@tanstack/react-query';
import { getCompanies } from './landing.service';

export function useCompaniesInfiniteQuery(size) {
    return useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam }) => getCompanies(pageParam, size),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
