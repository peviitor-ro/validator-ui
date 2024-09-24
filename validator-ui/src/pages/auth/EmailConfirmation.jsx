import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';

/**
 * EmailConfirmation component renders a page for email verification.
 * It includes an icon, title, description, and an external link to open the email.
 *
 * @component
 * @example
 * return (
 *   <EmailConfirmation />
 * )
 */
export function EmailConfirmation() {
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
