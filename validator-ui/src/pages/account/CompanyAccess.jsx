import { useEffect, useState } from 'react';
import { Alert } from '../../components/Alert';
import { LoadingPage } from '../../components/LoadingPage';
import { Spinner } from '../../components/Spinner';
import Loading from '../../components/Loading';
import { get, post } from '../../services/landing/landing.service';
import { routes } from '../../routes/routes';

/**
 * Component for managing company and scraper access for users.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.is_superuser - Indicates if the current user is a superuser.
 * @param {boolean} props.is_staff - Indicates if the current user is a staff member.
 * @param {Array} props.users - List of users.
 * @param {Array} props.companies - List of companies.
 * @param {Array} props.scrapers - List of scrapers.
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
    scrapers,
    email,
    setEmail,
    loading,
    setLoading,
    alertMessage,
    setAlertMessage,
    alert,
    setAlert,
    alertType,
    setAlertType,
}) {
    // Function to handle form submission
    const onsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = document.getElementById('email').value;
        const companySelect = document.getElementById('company');
        const companySelectedOptions = Array.from(companySelect.selectedOptions).map(
            (option) => option.value,
        );
        const scraperSelect = document.getElementById('scraper');
        const scraperSelectedOptions = Array.from(scraperSelect.selectedOptions).map(
            (option) => option.value,
        );
        const is_superuser = document.getElementById('is_superuser')?.checked;
        const is_staff = document.getElementById('is_staff')?.checked;

        const data = {
            email,
            company: companySelectedOptions,
            scraper: scraperSelectedOptions,
            is_superuser,
            is_staff,
        };
        const response = await post(routes.USER_COMPANIES, data);

        setAlert(true);
        if (response.status === 200) {
            setAlertMessage('Modificari salvate cu succes');
            setAlertType('success');
        } else {
            setAlertMessage('A aparut o eroare');
            setAlertType('error');
        }

        setLoading(false);
    };

    const handleClick = (e) => {
        onsSubmit(e);
    };

    // Function to handle search
    const [userIsStaff, setUserIsStaff] = useState(false);

    useEffect(() => {
        setUserIsStaff(users.find((user) => user?.email === email)?.is_staff);
    }, [email]);

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const companySelect = document.getElementById('company');
        const companyOptions = Array.from(companySelect.options);
        companyOptions.forEach((option) => {
            if (option.value.toLowerCase().includes(e.target.value.toLowerCase())) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    };

    // Function to handle scraper search
    const handleScraperSearch = async (e) => {
        const choices = window.confirm(
            `Doriti ca sistemul sa selecteze companiile din ${e.target.value}?`,
        );

        if (choices) {
            setLoading(true);
            try {
                const response = await get(routes.SCRAPER + e.target.value + '/', {}, 'response');
                const companiesLst = response.data.files.map((file) => file.name.split('.')[0]);
                const companySelect = document.getElementById('company');
                const companyOptions = Array.from(companySelect.options);

                companyOptions.forEach((option) => {
                    if (companiesLst.includes(option.value.toLowerCase())) {
                        option.selected = true;
                    }
                });
                setLoading(false);
            } catch (error) {
                setAlert(true);
                setAlertMessage(error);
                setAlertType('error');
                setLoading(false);
            }
        }
    };

    // Function to handle delete
    const handleDelete = async (e) => {
        setLoading(true);
        const response = await post(routes.USER_DELETE, { email });
        try {
            if (response.status === 200) {
                window.location.reload();
            } else {
                setAlert(true);
                setAlertMessage('A aparut o eroare');
                setAlertType('error');
            }
        } catch (error) {
            setAlert(true);
            setAlertMessage('A aparut o eroare');
            setAlertType('error');
            setLoading(false);
        }

        setLoading(false);
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
                        Administrare Companii si Scrapere
                    </h2>
                    <form className="flex flex-col gap-4 text-gray-500">
                        <div>
                            <label htmlFor="email">Selecteaza Utilizator</label>
                            <select
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-input h-full w-full p-2"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Selecteaza Utilizator
                                </option>
                                {users.map((user) => (
                                    <option key={user.email} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="company">Selecteaza Companii</label>
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
                                className="border-input h-64 w-full p-2"
                                size={20}
                            >
                                {companies.map((company) =>
                                    company.selected ? (
                                        <option
                                            key={company.company}
                                            value={company.company}
                                            selected
                                        >
                                            {company.company}
                                        </option>
                                    ) : (
                                        <option key={company.company} value={company.company}>
                                            {company.company}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="scraper">Selecteaza Scraper</label>
                            <select
                                id="scraper"
                                onChange={handleScraperSearch}
                                multiple
                                className="border-input h-full w-full p-2"
                                size={10}
                            >
                                {scrapers.map((scraper) =>
                                    scraper.selected ? (
                                        <option key={scraper.name} value={scraper.name} selected>
                                            {scraper.name}
                                        </option>
                                    ) : (
                                        <option key={scraper.name} value={scraper.name}>
                                            {scraper.name}
                                        </option>
                                    ),
                                )}
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
                                        {...(users.find((user) => user?.email === email)
                                            ?.is_superuser && {
                                            checked: true,
                                        })}
                                    />
                                    <label htmlFor="is_superuser">Steaza ca Super Utilizator</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_staff"
                                        name="is_staff"
                                        value="is_staff"
                                        defaultChecked={userIsStaff}
                                    />
                                    <label htmlFor="is_staff">Steaza ca Scraper</label>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <button
                                className="flex items-center justify-center btn btn-green text-center w-[100px] px-4"
                                onClick={handleClick}
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
