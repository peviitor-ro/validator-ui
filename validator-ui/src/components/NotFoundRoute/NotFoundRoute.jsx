import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../GenericPage';

export function NotFoundRoute() {
    return (
        <GenericPage>
            <GenericPage.Symbol icon={<FaceFrownIcon />} />
            <GenericPage.Title text="404 - Page Not Found" />
            <GenericPage.Description text="We're sorry, but the page you're looking for cannot be found. It might have been removed, had its name changed, or is temporarily unavailable." />
            <GenericPage.Link text="Go Back" to={'..'} />
        </GenericPage>
    );
}
