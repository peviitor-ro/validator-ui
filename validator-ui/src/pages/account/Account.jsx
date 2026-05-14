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
 * @state {Function} setIsSuperuser - Function to set the superuser state.
 * @state {Function} setIsStaff - Function to set the staff state.
 * @state {Function} setUsers - Function to set the users state.
 * @state {Function} setCompanies - Function to set the companies state.
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
        setIsSuperuser,
        setIsStaff,
        setUsers,
        setCompanies,
    } = useUserCompaniesSelector();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');

    const fetchUsersAndCompanies = async (selectedEmail = email) => {
        setLoading(true);
        try {
            const data = await getUsersAndCompanies(selectedEmail);
            setIsSuperuser(data.is_superuser);
            setIsStaff(data.is_staff);
            setUsers(data.users);
            setCompanies(data.companies);
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
        <section className="px-4 pb-6 lg:px-6 lg:pb-10">
            <div className="mb-6 rounded-[28px] border border-white/60 bg-white/90 p-5 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Administrare
                </p>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-800">Conturi si acces</h1>
                        <p className="mt-2 max-w-3xl text-sm text-slate-500 lg:text-base">
                            Gestioneaza utilizatorii interni, accesul lor la companii si rolurile
                            folosite in fluxul de validare si publicare a joburilor.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-500 lg:min-w-[280px]">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400">
                                Utilizatori
                            </p>
                            <p className="mt-1 text-xl font-semibold text-slate-800">{users.length}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400">
                                Companii
                            </p>
                            <p className="mt-1 text-xl font-semibold text-slate-800">
                                {companies.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.6fr)]">
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
                    email={email}
                    setEmail={setEmail}
                    refreshUsersAndCompanies={fetchUsersAndCompanies}
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
        </section>
    );
}
