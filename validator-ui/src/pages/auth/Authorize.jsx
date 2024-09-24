import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { GenericPage } from '../../components/GenericPage';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuthStateQuery } from '../../services/auth/auth.queries';
import Loading from '../../components/Loading';

import Unautorized from './Unautorized';
import PropTypes from 'prop-types';

/**
 * Template component renders a generic page with a symbol, title, and description.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.icon - The icon to be displayed in the symbol section.
 * @param {string} props.titleText - The text to be displayed as the title.
 * @param {string} props.descriptionText - The text to be displayed as the description.
 * @returns {JSX.Element} The rendered Template component.
 */
export const Template = ({ icon, titleText, descriptionText }) => {
    return (
        <GenericPage>
            <GenericPage.Symbol icon={icon} />
            <GenericPage.Title text={titleText} className="text-subtitle mt-0" />
            <GenericPage.Description text={descriptionText} />
        </GenericPage>
    );
};

/**
 * Authorize component handles the authorization process.
 * It retrieves the token from the URL parameters, fetches the authentication state,
 * and logs in the user if the data is available.
 *
 * @component
 * @returns {JSX.Element} The rendered component based on the authentication state.
 *
 * @example
 * <Authorize />
 *
 * @function
 * @name Authorize
 *
 * @description
 * - If the authentication data is loading, it displays a loading template.
 * - If there is an error or no data, it displays an unauthorized component.
 * - If the data is available, it logs in the user and navigates to the home page.
 */
export function Authorize() {
    /**
     * Extracts the token parameter from the URL using the useParams hook.
     *
     * @returns {Object} An object containing the token parameter from the URL.
     */
    const { token } = useParams();

    /**
     * Destructures the `login` function from the `useAuthContext` hook.
     */
    const { login } = useAuthContext();

    /**
     * Custom hook to fetch the authentication state.
     *
     * @param {string} token - The token used for authentication.
     * @returns {Object} The authentication state.
     * @returns {any} data - The data returned from the authentication query.
     * @returns {boolean} isLoading - Indicates if the authentication query is still loading.
     * @returns {boolean} isError - Indicates if there was an error with the authentication query.
     */
    const { data, isLoading, isError } = useAuthStateQuery(token);

    useEffect(() => {
        if (data) {
            login(data);
        }
    }, [data]);

    if (isLoading) {
        return (
            <Template
                icon={<Loading />}
                titleText="Incarcare"
                descriptionText="Va dura doar un moment"
            />
        );
    }

    if (isError || !data) {
        return <Unautorized />;
    }

    return <Navigate to="/" replace />;
}

Template.propTypes = {
    /**
     * The icon to be displayed.
     */
    icon: PropTypes.node.isRequired,
    /**
     * The title to be displayed.
     */
    titleText: PropTypes.string.isRequired,
    /**
     * The description to be displayed.
     */
    descriptionText: PropTypes.string.isRequired,
};
