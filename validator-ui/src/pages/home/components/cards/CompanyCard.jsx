import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';

import { removeCompany } from '../../../../services/landing/landing.service';
import { Button } from '../../../../components/Button';

import photo from '../../../../assets/svgs/photo.svg';

export function CompanyCard({ data }) {
    const { company, description, logo, website, jobsCount } = data;

    function handleDelete() {
        const responseStatus = removeCompany(company);
        responseStatus.then((status) => {
            if (status === 200) {
                window.location.reload();
            }
        });
    }

    const logoRef = useRef(null);

    logoRef.current?.addEventListener('error', () => {
        logoRef.current.src = photo;
        logoRef.current.onerror = null;
    });

    return (
        <article className="relative card flex flex-col h-[400px] overflow-hidden">
            <div className="absolute right-8">
                <Button
                    className="relative rounded-none btn-delete transform translate-x-full hover:bg-red-600  hover:translate-x-8 hover:duration-300 hover:ease-in-out hover:transition active:translate-y-2 "
                    icon={<TrashIcon className="absolute left-2 w-5" />}
                    text="Sterge"
                    onClick={handleDelete}
                />
            </div>
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
        </article>
    );
}
