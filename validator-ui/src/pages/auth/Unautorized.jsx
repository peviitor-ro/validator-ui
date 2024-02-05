import { LockClosedIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';
import { routes } from '../../routes/routes';

export default function Unautorized() {
    return (
        <GenericPage>
            <GenericPage.Symbol icon={<LockClosedIcon />} />
            <GenericPage.Title text="Unauthorized Access" />
            <GenericPage.Description
                text="Sorry, but you do not have permission to access the requested content. Please ensure
                you are logged in with the correct account."
            />
            <GenericPage.Link to={`/${routes.LOGIN}`} text="Back to Login" />
        </GenericPage>
    );
}
