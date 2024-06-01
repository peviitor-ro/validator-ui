import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';

export function EmailConfirmation() {
    //todo check user email

    return (
        <GenericPage>
            <GenericPage.Symbol icon={<AtSymbolIcon />} />
            <GenericPage.Title text="Verifică-ți adresa de email" />
            <GenericPage.Description text="Dacă nu o găsești în inbox, nu uita să verifici folderul de spam." />
            <GenericPage.ExternalLink
                text="Deschide Emailul"
                href="https://mail.google.com/mail"
                target="blank"
            />
        </GenericPage>
    );
}
