import { useInfiniteQuery } from '@tanstack/react-query';
import { getCompanies } from './landing.service';

export function useCompaniesInfiniteQuery() {
    return useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam }) => getCompanies(pageParam, 20),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
