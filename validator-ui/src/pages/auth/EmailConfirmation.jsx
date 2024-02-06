import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';

export function EmailConfirmation() {
    //todo check user email

    return (
        <GenericPage>
            <GenericPage.Symbol icon={<AtSymbolIcon />} />
            <GenericPage.Title text="Please check your email" />
            <GenericPage.Description text="If you don't see it in your inbox, don't forget to check your spam folder." />
            <GenericPage.ExternalLink
                text="Open Email"
                href="https://mail.google.com/mail"
                target="blank"
            />
        </GenericPage>
    );
}
