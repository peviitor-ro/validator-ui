import { useRef, useState, useEffect } from 'react';
import { PhotoIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { removeCompany } from '../../../../services/landing/landing.service';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { CompanyForm } from '../forms/CompanyForm';
import clsx from 'clsx';
import photo from '../../../../assets/svgs/photo.svg';
import { useUserCompaniesSelector } from '../../../../store/userCompanies.selector';

export function CompanyCard({ data }) {
    const { company, scname, description, logo, website, jobsCount } = data;

    // get the user context
    const store = JSON.parse(localStorage.getItem('validator'));
    const [open, setOpen] = useState(false);

    // check if the user has access
    const [access, setAccess] = useState(false);

    useEffect(() => {
        if (store?.is_superuser || store?.is_staff) {
            setAccess(true);
        }
    }, [store]);

    // handle the delete action
    function handleDelete() {
        // show a confirmation dialog
        const results = window.confirm('Esti sigur ca vrei sa stergi aceasta companie?');

        // if the user cancels the action, return
        if (!results) {
            return;
        }

        // remove the company
        const responseStatus = removeCompany(company);
        responseStatus.then((status) => {
            if (status === 200) {
                window.location.reload();
            }
        });
    }

    const logoRef = useRef(null);

    // handle the image error
    logoRef.current?.addEventListener('error', () => {
        logoRef.current.src = photo;
        logoRef.current.onerror = null;
    });

    return (
        <article className="relative card flex flex-col h-[400px] overflow-hidden">
            {access && (
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
                <p className="text-center mb-12">No description</p>
            )}

            <NavLink
                to={`/jobs/${company}`}
                className={clsx('btn btn-primary active-link text-center mb-2', {
                    'btn-disabled': !jobsCount,
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
                    company={company}
                    scname={scname}
                    description={description}
                    website={website}
                    method="PUT"
                />
            </Modal>
        </article>
    );
}
