import React, { useEffect, useState } from 'react';
import { CompanyAccess } from './CompanyAccess';
import { AccountForm } from './AccountForm';
import { useUserCompaniesSelector } from '../../store/userCompanies.selector';
import { getUsersAndCompanies } from '../../services/landing/landing.service';

export function Account() {
    const {
        is_superuser,
        is_staff,
        users,
        companies,
        scrapers,
        setIsSuperuser,
        setIsStaff,
        setUsers,
        setCompanies,
        setScrapers,
    } = useUserCompaniesSelector();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');

    const fetchUsersAndCompanies = async () => {
        setLoading(true);
        try {
            const data = await getUsersAndCompanies(email);
            setIsSuperuser(data.is_superuser);
            setIsStaff(data.is_staff);
            setUsers(data.users);
            setCompanies(data.companies);
            setScrapers(data.scrapers);
            setLoading(false);
        } catch (error) {
            setAlert(true);
            setAlertMessage('A aparut o eroare');
            setAlertType('error');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersAndCompanies();
    }, [email]);
    return (
        <div>
            {is_superuser && (
                <AccountForm
                    loading={loading}
                    setLoading={setLoading}
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                    alert={alert}
                    setAlert={setAlert}
                    alertType={alertType}
                    setAlertType={setAlertType}
                />
            )}
            <CompanyAccess
                is_superuser={is_superuser}
                is_staff={is_staff}
                users={users}
                companies={companies}
                scrapers={scrapers}
                email={email}
                setEmail={setEmail}
                loading={loading}
                setLoading={setLoading}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
                alert={alert}
                setAlert={setAlert}
                alertType={alertType}
                setAlertType={setAlertType}
            />
        </div>
    );
}
