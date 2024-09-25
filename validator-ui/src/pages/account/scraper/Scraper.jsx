import { infiniteScroll } from '../../../hooks/infiniteScroll';
import { useScrapersQuery } from '../../../services/landing/landing.queries';
import { useScraperSelector } from '../../../store/scraper.selector';
import { Container } from '../../../components/Container';
import { Folder } from './components/Folders';
import Loading from '../../../components/Loading';

export function Scraper() {
    const { data, status, error, button } = infiniteScroll(
        useScraperSelector,
        useScrapersQuery,
        'Se incarca mai multe scrapere ...',
        'Se incarca mai multe scrapere',
        'Nu mai sunt scrapere de incarcat',
    );

    return (
        <div className="flex flex-col gap-4 ml-2 p-2">
            {status === 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status === 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <div className="flex flex-wrap align-middle justify-center gap-2">
                    {data?.pages[0].data?.map((scraper, index) => {
                        return (
                            <Folder key={index} scraper={scraper} status={status} error={error} />
                        );
                    })}
                </div>
            )}
            {button}
        </div>
    );
}
