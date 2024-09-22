import { useEffect, useState } from 'react';
import { Alert } from '../../components/Alert';
import { Loader } from '../../components/Loader';
import { Spinner } from '../../components/Spinner';
import Loading from '../../components/Loading';
import {
    editUserCompanies,
    getScraperFiles,
    deleteUser,
} from '../../services/landing/landing.service';

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
}) {
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');

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
        const response = await editUserCompanies(JSON.stringify(data));

        setAlert(true);
        if (response === 200) {
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

    const handleScraperSearch = async (e) => {
        const choices = window.confirm(
            `Doriti ca sistemul sa selecteze companiile din ${e.target.value}?`,
        );

        if (choices) {
            setLoading(true);
            try {
                const response = await getScraperFiles(e.target.value);
                const companiesLst = response.files.map((file) => file.name.split('.')[0]);
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
                setAlertMessage('A aparut o eroare');
                setAlertType('error');
                setLoading(false);
            }
        }
    };

    const handleDelete = async (e) => {
        setLoading(true);
        const response = await deleteUser(email);
        try {
            if (response === 200) {
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
            {alert && <Alert message={alertMessage} type={alertType} />}
            {loading && (
                <div className="flex items-center justify-center fixed bg-gray-500 bg-opacity-50 top-0 left-0 w-[100vw] h-[100vh] z-50">
                    <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md p-4">
                        <Loader message="Se incarca" imgStyle="w-32" />
                    </div>
                </div>
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

                        <div
                            className="
                        flex flex-col gap-2
                        "
                        >
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
                                className="border-input h-full w-full p-2"
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
                                    {loading ? <Loading className="w-5" /> : 'Stergeti'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    );
}
