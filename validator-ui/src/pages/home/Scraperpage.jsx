import { Home } from './components/filters/HeaderFilters';
import { Scraper } from '../account/scraper/Scraper';
import { AddScraperForm } from '../account/scraper/components/AddScraperForm';
import { useScraperSelector } from '../../store/scraper.selector';
import { SCRAPER_OPTION } from './components/filters/constants';

export const Scraperpage = () => {
    return (
        <Home>
            <Home.Header
                title={'Scraperi'}
                formComponent={<AddScraperForm />}
                selector={useScraperSelector}
                options={SCRAPER_OPTION}
            />
            <Scraper />
        </Home>
    );
};
