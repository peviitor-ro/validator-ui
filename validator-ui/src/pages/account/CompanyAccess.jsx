import { useEffect, useState } from 'react';
import { Alert } from '../../components/Alert';
import { LoadingPage } from '../../components/LoadingPage';
import { Spinner } from '../../components/Spinner';
import Loading from '../../components/Loading';
import { post } from '../../services/landing/landing.service';
import { routes } from '../../routes/routes';

/**
 * Component for managing company access for users.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.is_superuser - Indicates if the current user is a superuser.
 * @param {boolean} props.is_staff - Indicates if the current user is a staff member.
 * @param {Array} props.users - List of users.
 * @param {Array} props.companies - List of companies.
 * @param {string} props.email - The email of the selected user.
 * @param {Function} props.setEmail - Function to set the email of the selected user.
 * @param {boolean} props.loading - Indicates if the component is in a loading state.
 * @param {Function} props.setLoading - Function to set the loading state.
 * @param {string} props.alertMessage - The message to display in the alert.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {boolean} props.alert - Indicates if the alert is visible.
 * @param {Function} props.setAlert - Function to set the alert visibility.
 * @param {string} props.alertType - The type of the alert (e.g., 'success', 'error').
 * @param {Function} props.setAlertType - Function to set the alert type.
 *
 * @returns {JSX.Element} The rendered component.
 */
export function CompanyAccess({
    is_superuser,
    is_staff,
    users,
    companies,
    email,
    setEmail,
    refreshUsersAndCompanies,
    loading,
    setLoading,
    alertMessage,
    setAlertMessage,
    alert,
    setAlert,
    alertType,
    setAlertType,
}) {
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [userIsSuperuser, setUserIsSuperuser] = useState(false);
    const [userIsStaff, setUserIsStaff] = useState(false);
    const [search, setSearch] = useState('');

    const getErrorMessage = (error) => {
        return (
            error?.response?.data?.detail ||
            error?.response?.data?.message ||
            'A aparut o eroare'
        );
    };

    // Function to handle form submission
    const onsSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setAlert(true);
            setAlertMessage('Selecteaza un utilizator');
            setAlertType('error');
            return;
        }

        if (selectedCompanies.length === 0) {
            setAlert(true);
            setAlertMessage('Selecteaza cel putin o companie');
            setAlertType('error');
            return;
        }

        setLoading(true);

        const data = {
            email,
            company: selectedCompanies,
            // Backend-ul de administrare inca asteapta acest camp chiar daca UI-ul de scraperi a fost eliminat.
            scraper: [],
            is_superuser: userIsSuperuser,
            is_staff: userIsStaff,
        };
        try {
            const response = await post(routes.USER_COMPANIES, data);

            setAlert(true);
            if (response.status === 200) {
                setAlertMessage('Modificari salvate cu succes');
                setAlertType('success');
                await refreshUsersAndCompanies?.(email);
            } else {
                setAlertMessage('A aparut o eroare');
                setAlertType('error');
            }
        } catch (error) {
            setAlert(true);
            setAlertMessage(getErrorMessage(error));
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const selectedUser = users.find((user) => user?.email === email);
        setUserIsSuperuser(Boolean(selectedUser?.is_superuser));
        setUserIsStaff(Boolean(selectedUser?.is_staff));
    }, [email, users]);

    useEffect(() => {
        setSelectedCompanies(
            companies.filter((company) => company.selected).map((company) => company.company),
        );
    }, [companies]);

    useEffect(() => {
        setSearch('');
    }, [email]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setSelectedCompanies(Array.from(e.target.selectedOptions, (option) => option.value));
    };

    // Function to handle delete
    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await post(routes.USER_DELETE, { email });
            if (response.status === 200) {
                window.location.reload();
            } else {
                setAlert(true);
                setAlertMessage('A aparut o eroare');
                setAlertType('error');
            }
        } catch (error) {
            setAlert(true);
            setAlertMessage(getErrorMessage(error));
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Alert message={alertMessage} type={alertType} visible={alert} setVisible={setAlert} />
            {loading && (
                <LoadingPage message={'Se incarca'}>
                    <Loading />
                </LoadingPage>
            )}
            {is_superuser || is_staff ? (
                <div className="flex flex-col gap-4 m-2 p-2 border bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">
                        Administrare Companii
                    </h2>
                    <form className="flex flex-col gap-4 text-gray-500" onSubmit={onsSubmit}>
                        <div>
                            <label htmlFor="email">Selecteaza Utilizator</label>
                            <select
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="border-input h-full w-full p-2"
                            >
                                <option value="" disabled>
                                    Selecteaza Utilizator
                                </option>
                                {users.map((user, index) => (
                                    <option key={`${user.email}-${index}`} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="company">Selecteaza Companii</label>
                            <p className="text-sm text-gray-400">
                                Selectie curenta: {selectedCompanies.length}
                            </p>
                            <input
                                type="text"
                                id="search"
                                className="
                                border-input h-full w-full p-2"
                                placeholder="Cauta companie"
                                value={search}
                                onChange={handleSearch}
                            />
                            <select
                                id="company"
                                multiple
                                value={selectedCompanies}
                                onChange={handleCompanyChange}
                                className="border-input h-64 w-full p-2"
                                size={20}
                            >
                                {companies
                                    .filter((company) =>
                                        company.company.toLowerCase().includes(search.toLowerCase()),
                                    )
                                    .map((company, index) => (
                                        <option key={`${company.company}-${index}`} value={company.company}>
                                            {company.company}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {is_superuser && (
                            <div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_superuser"
                                        name="is_superuser"
                                        value="is_superuser"
                                        checked={userIsSuperuser}
                                        onChange={(e) => setUserIsSuperuser(e.target.checked)}
                                    />
                                    <label htmlFor="is_superuser">Steaza ca Super Utilizator</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_staff"
                                        name="is_staff"
                                        value="is_staff"
                                        checked={userIsStaff}
                                        onChange={(e) => setUserIsStaff(e.target.checked)}
                                    />
                                    <label htmlFor="is_staff">Seteaza ca Staff</label>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                className="flex items-center justify-center btn btn-green text-center w-[100px] px-4"
                                disabled={loading || !email}
                            >
                                {loading ? (
                                    <p className="flex items-center gap-2 text-white ">
                                        <span className="w-5 h-5">
                                            <Spinner />
                                        </span>{' '}
                                        Asteapta
                                    </p>
                                ) : (
                                    'Salvati'
                                )}
                            </button>
                            {is_superuser && (
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 btn btn-red text-center w-[100px] px-4"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <p className="flex items-center gap-2 text-white ">
                                            <span className="w-5 h-5">
                                                <Spinner />
                                            </span>{' '}
                                            Asteapta
                                        </p>
                                    ) : (
                                        'Stergeti'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    );
}
