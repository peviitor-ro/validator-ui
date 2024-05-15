import { useEffect, useState } from 'react';

import { useUserCompaniesSelector } from '../../store/userCompanies.selector';
import { getUsersAndCompanies, editUserCompanies } from '../../services/landing/landing.service';
import { Alert } from '../../components/Alert';

import Loading from '../../components/Loading';

export function CompanyAccess() {
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

    const fetchUsersAndCompanies = async () => {
        const data = await getUsersAndCompanies(email);
        setIsSuperuser(data.is_superuser);
        setIsStaff(data.is_staff);
        setUsers(data.users);
        setCompanies(data.companies);
        setScrapers(data.scrapers);
    };

    useEffect(() => {
        fetchUsersAndCompanies();
    }, [email]);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
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

    return (
        <>
            {alert && <Alert message={alertMessage} type={alertType} />}
            {is_superuser ? (
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

                        <div>
                            <label htmlFor="company">Selecteaza Companii</label>
                            <select
                                id="company"
                                multiple
                                className="border-input h-full w-full p-2"
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
                                multiple
                                className="border-input h-full w-full p-2"
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
                        <button
                            className="rounded-full border px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white active:translate-y-1 w-[100px]"
                            onClick={handleClick}
                        >
                            {loading ? <Loading className="w-5" /> : 'Salvati'}
                        </button>
                    </form>
                </div>
            ) : is_staff ? (
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

                        <div>
                            <label htmlFor="company">Selecteaza Companii</label>
                            <select
                                id="company"
                                multiple
                                className="border-input h-full w-full p-2"
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
                                multiple
                                className="border-input h-full w-full p-2"
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
                        <button
                            className="rounded-full border px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white active:translate-y-1 w-[100px]"
                            onClick={handleClick}
                        >
                            {loading ? <Loading className="w-5" /> : 'Salvati'}
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    );
}
