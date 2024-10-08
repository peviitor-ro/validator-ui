import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { routes } from '../../routes/routes';
import { getJobs, getScrapers, getScraperFiles, getCities, get } from './landing.service';

export function useCompaniesInfiniteQuery(page_size, order, search) {
    return useInfiniteQuery({
        queryKey: ['projects', order, search],
        queryFn: ({ pageParam }) => {
            return get(routes.COMPANY, {
                page: pageParam,
                page_size,
                order,
                search,
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}

export function useJobsInfiniteQuery(company, size, order, search) {
    return useInfiniteQuery({
        queryKey: ['jobs', company, order, search],
        queryFn: ({ pageParam }) => getJobs(company, pageParam, size, order, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}

export function useScrapersQuery(order, search) {
    return useInfiniteQuery({
        queryKey: ['scrapers', order, search],
        queryFn: ({ pageParam }) => getScrapers(pageParam, order, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}

export function useScraperFilesQuery(scraperName) {
    return useQuery({
        queryKey: ['scraperFiles', scraperName],
        queryFn: () => getScraperFiles(scraperName),
    });
}

export function useCitiesQuery(size, search) {
    return useInfiniteQuery({
        queryKey: ['cities', search],
        queryFn: ({ pageParam }) => getCities(pageParam, size, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
