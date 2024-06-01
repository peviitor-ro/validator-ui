import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { GenericPage } from '../../components/GenericPage';
import Loading from '../../components/Loading';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuthStateQuery } from '../../services/auth/auth.queries';
import Unautorized from './Unautorized';
import PropTypes from 'prop-types';

/**
 * Renders the Authorize template component.
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

export function Authorize() {
    const { token } = useParams();
    const { login } = useAuthContext();
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
