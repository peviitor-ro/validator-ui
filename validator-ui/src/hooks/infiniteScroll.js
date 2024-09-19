import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from './useDebounce';
import { Button } from './Button';

export function infiniteScroll(
    selector,
    query,
    buttonText,
    fetchNextPageText,
    noPagesText,
    ...params
) {
    const { ref, inView } = useInView();
    const { order, search } = selector();
    const debounceSearch = useDebounce(search);
    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } = query(
        ...params,
        order,
        debounceSearch,
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    const button = Button({
        ref,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        buttonText,
        fetchNextPageText,
        noPagesText,
    });

    return { data, status, error, button };
}
