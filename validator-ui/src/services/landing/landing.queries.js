import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { routes } from '../../routes/routes';
import { get } from './landing.service';

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

export function useJobsInfiniteQuery(company, page_size, order, search) {
    return useInfiniteQuery({
        queryKey: ['jobs', company, order, search],
        queryFn: ({ pageParam }) =>
            get(routes.JOBS, {
                company,
                page: pageParam,
                page_size,
                order,
                search,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}

export function useScrapersQuery(order, search) {
    return useInfiniteQuery({
        queryKey: ['scrapers', order, search],
        queryFn: ({ pageParam }) => get(routes.SCRAPER_ADD, { page: pageParam, order, search }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}

export function useScraperFilesQuery(scraperName) {
    return useQuery({
        queryKey: ['scraperFiles', scraperName],
        queryFn: () => get(routes.SCRAPER + scraperName + '/', {}, 'response'),
    });
}

export function useCitiesQuery(size, search) {
    return useInfiniteQuery({
        queryKey: ['cities', search],
        queryFn: ({ pageParam }) => get(routes.CITIES, { page: pageParam, size, search }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
}
