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
                <div className="rounded-[28px] border border-white/60 bg-white/90 p-5 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:p-6">
                    <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                                Acces operational
                            </p>
                            <h2 className="text-2xl font-semibold text-slate-800">
                                Administrare companii
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Selecteaza utilizatorul si configureaza companiile pe care le poate
                                administra in platforma.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                            <span className="block text-xs uppercase tracking-wide text-slate-400">
                                Selectie curenta
                            </span>
                            <span className="mt-1 block text-lg font-semibold text-slate-800">
                                {selectedCompanies.length} companii
                            </span>
                        </div>
                    </div>
                    <form className="flex flex-col gap-6 text-slate-600" onSubmit={onsSubmit}>
                        <div
                            className={
                                is_superuser
                                    ? 'grid gap-6 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.3fr)]'
                                    : 'grid gap-6'
                            }
                        >
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-slate-600"
                                    >
                                        Selecteaza utilizator
                                    </label>
                                    <select
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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

                                {is_superuser && (
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="mb-3 text-sm font-medium text-slate-700">
                                            Roluri utilizator
                                        </p>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    id="is_superuser"
                                                    name="is_superuser"
                                                    value="is_superuser"
                                                    checked={userIsSuperuser}
                                                    onChange={(e) =>
                                                        setUserIsSuperuser(e.target.checked)
                                                    }
                                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    Seteaza ca Super Utilizator
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    id="is_staff"
                                                    name="is_staff"
                                                    value="is_staff"
                                                    checked={userIsStaff}
                                                    onChange={(e) =>
                                                        setUserIsStaff(e.target.checked)
                                                    }
                                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    Seteaza ca Staff
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="company"
                                        className="text-sm font-medium text-slate-600"
                                    >
                                        Selecteaza companii
                                    </label>
                                    <input
                                        type="text"
                                        id="search"
                                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Cauta companie"
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-3 shadow-inner">
                                    <select
                                        id="company"
                                        multiple
                                        value={selectedCompanies}
                                        onChange={handleCompanyChange}
                                        className="h-72 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        size={20}
                                    >
                                        {companies
                                            .filter((company) =>
                                                company.company
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase()),
                                            )
                                            .map((company, index) => (
                                                <option
                                                    key={`${company.company}-${index}`}
                                                    value={company.company}
                                                >
                                                    {company.company}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-2">
                            <button
                                type="submit"
                                className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
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
                                    className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
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
