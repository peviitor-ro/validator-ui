import { LockClosedIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../components/GenericPage';
import { routes } from '../../routes/routes';
import PropTypes from 'prop-types';

/**
 * Template component renders a generic page with a symbol, title, description, and link.
 *
 * @param {Object} props - The properties object.
 * @param {React.Element} props.icon - The icon element to be displayed.
 * @param {string} props.title - The title text to be displayed.
 * @param {string} props.description - The description text to be displayed.
 * @param {Object} props.link - The link object containing the URL and link text.
 * @param {string} props.link.to - The URL to navigate to when the link is clicked.
 * @param {string} props.link.text - The text to be displayed for the link.
 * @returns {JSX.Element} The rendered Template component.
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

/**
 * Unautorized component renders a template indicating that the user does not have permission to access the requested content.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
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
