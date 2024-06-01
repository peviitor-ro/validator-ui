import { LockClosedIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';
import { routes } from '../../routes/routes';
import PropTypes from 'prop-types';

/**
 * Renders the Unautorized template component when the user is not authorized to access a page.
 */
export const Template = ({ icon, title, description, link }) => {
    return (
        <GenericPage>
            <GenericPage.Symbol icon={icon} />
            <GenericPage.Title text={title} />
            <GenericPage.Description text={description} />
            <GenericPage.Link to={link.to} text={link.text} />
        </GenericPage>
    );
};

export default function Unautorized() {
    return (
        <Template
            icon={<LockClosedIcon />}
            title="Acces neautorizat"
            description="Ne pare rău, dar nu aveți permisiunea de a accesa conținutul solicitat. Vă rugăm să vă asigurați că sunteți autentificat cu contul corect."
            link={{ to: `/${routes.LOGIN}`, text: 'Înapoi la autentificare' }}
        />
    );
}

Template.propTypes = {
    /**
     * The icon to be displayed.
     */
    icon: PropTypes.node.isRequired,
    /**
     * The title to be displayed.
     */
    title: PropTypes.string.isRequired,
    /**
     * The description to be displayed.
     */
    description: PropTypes.string.isRequired,
    /**
     * The link to be displayed.
     */
    link: PropTypes.shape({
        to: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};