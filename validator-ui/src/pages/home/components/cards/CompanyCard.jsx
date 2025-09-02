import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { post } from '../../../../services/landing/landing.service';
import { routes } from '../../../../routes/routes';
import { AnimatedCard } from '../../../../components/AnimatedCard';
import { PhotoIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import photo from '../../../../assets/svgs/photo.svg';

import Badge from '../../../../components/Badge';
import pencil from '../../../../assets/icons/pencil.png';
import deleteIcon from '../../../../assets/icons/delete.png';
import www from '../../../../assets/icons/www.png';

/**
 * Component representing a card for a company with various actions and information.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object containing company information.
 * @param {Function} props.setCompanies - Function to update the list of companies.
 * @param {Function} props.setAlertOpen - Function to set the alert open state.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {Function} props.setAlertType - Function to set the alert type.
 * @param {Function} props.setEditedData - Function to set the edited data.
 * @param {Function} props.setOpenModal - Function to set the modal open state.
 *
 * @returns {JSX.Element} The rendered CompanyCard component.
 */
export function CompanyCard({
    data,
    setCompanies,
    setAlertOpen,
    setAlertMessage,
    setAlertType,
    setEditedData,
    setOpenModal,
}) {
    const {
        id,
        company,
        scname,
        description,
        logo,
        website,
        jobsCount,
        published_jobs,
        have_access,
        source_name,
    } = data;

    /**
     * Handles the deletion of a company.
     *
     * This function performs the following steps:
     * 1. Shows a confirmation dialog to the user.
     * 2. If the user confirms, it proceeds to delete the company.
     * 3. Displays an alert message based on the success or failure of the deletion.
     *
     * @async
     * @function handleDelete
     * @returns {Promise<void>} A promise that resolves when the deletion process is complete.
     */
    async function handleDelete() {
        // show a confirmation dialog
        const results = window.confirm(`Esti sigur ca vrei sa stergi compania ${company}?`);

        // if the user cancels the action, return
        if (!results) {
            return;
        }

        // show an alert message
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

    // handle the case when the logo is not available
    const logoRef = useRef(null);
    logoRef.current?.addEventListener('error', () => {
        logoRef.current.src = photo;
        logoRef.current.onerror = null;
    });

    // navigation links
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';
    const navLinks = [
        {
            name: 'Editeaza',
            onClick: () => setOpenModal(true),
            icon: <img src={pencil} alt="Editeaza" className={iconsClasses} />,
        },
        {
            name: 'Sterge',
            onClick: handleDelete,
            icon: <img src={deleteIcon} alt="Sterge" className={iconsClasses} />,
        },
        {
            name: 'Vizualizeaza Website',
            url: website,
            icon: <img src={www} alt="Vizualizeaza Website" className={iconsClasses} />,
        },
    ];

    // remove the first two links if the user does not have access
    if (!have_access) {
        navLinks.splice(0, 2);
    }

    return (
        <AnimatedCard
            navLinks={navLinks}
            cardId={company}
            data={data}
            setEditedData={setEditedData}
        >
            {source_name && (
                <div className="absolute top-10 w-full z-20 -rotate-45 origin-top-left">
                    <Badge text={source_name} color="bg-blue-500" textColor="text-white" />
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
                to={`/jobs/${id}/${company}`}
                className={clsx('btn btn-primary active-link text-center mb-2', {
                    'btn-disabled': !jobsCount || !have_access,
                })}
            >
                Vizualizeaza Joburi ({jobsCount ?? 0})
            </NavLink>
        </AnimatedCard>
    );
}
