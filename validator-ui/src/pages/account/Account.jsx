import React, { useEffect, useState } from 'react';
import { CompanyAccess } from './CompanyAccess';
import { AccountForm } from './AccountForm';
import { useUserCompaniesSelector } from '../../store/userCompanies.selector';
import { getUsersAndCompanies } from '../../services/landing/landing.service';

/**
 * Account component that manages user and company data.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component fetches and displays user and company data based on the provided email.
 * It uses the `useUserCompaniesSelector` hook to manage state and fetches data using the `getUsersAndCompanies` function.
 *
 * @example
 * <Account />
 *
 * @hook
 * @name useUserCompaniesSelector
 *
 * @state {boolean} is_superuser - Indicates if the user is a superuser.
 * @state {boolean} is_staff - Indicates if the user is a staff member.
 * @state {Array} users - List of users.
 * @state {Array} companies - List of companies.
 * @state {Array} scrapers - List of scrapers.
 * @state {Function} setIsSuperuser - Function to set the superuser state.
 * @state {Function} setIsStaff - Function to set the staff state.
 * @state {Function} setUsers - Function to set the users state.
 * @state {Function} setCompanies - Function to set the companies state.
 * @state {Function} setScrapers - Function to set the scrapers state.
 * @state {string} email - The email used to fetch data.
 * @state {Function} setEmail - Function to set the email state.
 * @state {boolean} loading - Indicates if data is being loaded.
 * @state {Function} setLoading - Function to set the loading state.
 * @state {string} alertMessage - Message to display in the alert.
 * @state {Function} setAlertMessage - Function to set the alert message.
 * @state {boolean} alert - Indicates if an alert should be displayed.
 * @state {Function} setAlert - Function to set the alert state.
 * @state {string} alertType - Type of alert to display (e.g., 'success', 'error').
 * @state {Function} setAlertType - Function to set the alert type.
 *
 * @function fetchUsersAndCompanies
 * @description Fetches users and companies data based on the email state.
 *
 * @hook useEffect
 * @description Calls `fetchUsersAndCompanies` when the email state changes.
 */
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
