import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { GenericPage } from '../../components/GenericPage';
import Loading from '../../components/Loading';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuthStateQuery } from '../../services/auth/auth.queries';
import Unautorized from './Unautorized';

function Authorize() {
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
            <GenericPage>
                <GenericPage.Symbol icon={<Loading />} />
                <GenericPage.Title text="Loading" className="text-subtitle mt-0" />
                <GenericPage.Description text="It will take just a moment" />
            </GenericPage>
        );
    }

    if (isError || !data) {
        return <Unautorized />;
    }

    return <Navigate to="/" replace />;
}

export default Authorize;
