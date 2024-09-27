import { useRef, useState } from 'react';
import { PhotoIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { post } from '../../../../services/landing/landing.service';
import { routes } from '../../../../routes/routes';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { CompanyForm } from '../forms/CompanyForm';
import clsx from 'clsx';
import photo from '../../../../assets/svgs/photo.svg';

/**
 * CompanyCard component displays detailed information about a company.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The company data object.
 * @param {string} props.data.company - The name of the company.
 * @param {string} props.data.scname - The short name of the company.
 * @param {string} props.data.description - The description of the company.
 * @param {string} props.data.logo - The URL of the company's logo.
 * @param {string} props.data.website - The URL of the company's website.
 * @param {number} props.data.jobsCount - The total number of jobs available at the company.
 * @param {number} props.data.published_jobs - The number of published jobs at the company.
 * @param {boolean} props.data.have_access - Indicates if the user has access to the company's data.
 * @returns {JSX.Element} The rendered CompanyCard component.
 */
export function CompanyCard({ data, setCompanies, setAlertOpen, setAlertMessage, setAlertType }) {
    const { company, scname, description, logo, website, jobsCount, published_jobs, have_access } =
        data;

    const [open, setOpen] = useState(false);

    /**
     * Handles the deletion of a company.
     *
     * This function shows a confirmation dialog to the user. If the user confirms,
     * it proceeds to remove the company. Upon successful deletion (status 200),
     * the page is reloaded.
     *
     * @function handleDelete
     * @returns {void}
     */
    async function handleDelete() {
        // show a confirmation dialog
        const results = window.confirm('Esti sigur ca vrei sa stergi aceasta companie?');

        // if the user cancels the action, return
        if (!results) {
            return;
        }

        /**
         * Sets the alert state with the provided message and type.
         *
         * @param {string} message - The message to display in the alert.
         * @param {string} type - The type of the alert (e.g., 'success', 'error').
         */
        const setAlert = (message, type) => {
            setAlertOpen(true);
            setAlertMessage(message);
            setAlertType(type);
        };

        // remove the company
        const response = await post(routes.COMPANY_DELETE, { company });
        if (response.status !== 200) {
            setAlert('A aparut o eroare la stergerea companiei.', 'error');
            return;
        }

        setCompanies((prev) => prev.filter((item) => item.company !== company));
        setAlert('Compania a fost stearsa cu succes.', 'success');
    }

    const logoRef = useRef(null);
    logoRef.current?.addEventListener('error', () => {
        logoRef.current.src = photo;
        logoRef.current.onerror = null;
    });

    return (
        <article className="relative card flex flex-col h-[400px] overflow-hidden">
            {have_access && (
                <div className="absolute right-8 flex flex-col gap-2">
                    <Button
                        className="relative btn-delete transform translate-x-full hover:bg-red-600  hover:translate-x-8 hover:duration-300 hover:ease-in-out hover:transition active:translate-y-2 "
                        icon={<TrashIcon className="absolute left-2 w-5" />}
                        text="Sterge"
                        onClick={handleDelete}
                    />
                    <Button
                        className="relative btn-edit transform translate-x-full hover:bg-yellow-600 hover:translate-x-8 hover:duration-300 hover:ease-in-out hover:transition active:translate-y-2 "
                        icon={<PencilSquareIcon className="absolute left-2 w-5" />}
                        text="Editeaza"
                        onClick={() => setOpen(true)}
                    />
                </div>
            )}
            {logo ? (
                <img ref={logoRef} src={logo} className="m-auto flex-0  h-[80px]" alt="Company" />
            ) : (
                <PhotoIcon className="text-subtitle w-20 m-auto" />
            )}

            <h3 className="text-center mb-6 uppercase">{company ?? '-'}</h3>

            {description ? (
                <p className="line-clamp-2 mb-6 break-all">{description}</p>
            ) : (
                <p className="text-center mb-12">Nici o descriere disponibila.</p>
            )}

            <p className="text-sm text-center font-bold mb-2">
                Joburi publicate: {published_jobs ?? 0}
            </p>

            <NavLink
                to={`/jobs/${company}`}
                className={clsx('btn btn-primary active-link text-center mb-2', {
                    'btn-disabled': !jobsCount || !have_access,
                })}
            >
                Vizualizeaza Joburi ({jobsCount ?? 0})
            </NavLink>

            <a
                href={website}
                className={clsx('btn btn-primary-outlined text-center', {
                    'btn-disabled-outlined': !jobsCount,
                })}
            >
                Vizualizeaza WebSite
            </a>
            <Modal open={open} setOpen={setOpen}>
                <CompanyForm
                    companyData={data}
                    method="PUT"
                    setCompanies={setCompanies}
                    setAlertOpen={setAlertOpen}
                    setAlertMessage={setAlertMessage}
                    setAlertType={setAlertType}
                />
            </Modal>
        </article>
    );
}
