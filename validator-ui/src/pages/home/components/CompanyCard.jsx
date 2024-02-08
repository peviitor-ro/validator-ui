import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { PhotoIcon } from '@heroicons/react/24/outline';

export function CompanyCard({ data }) {
    const { company, description, logo, link, website, jobsCount } = data;

    return (
        <article className="card flex flex-col h-[400px]">
            {logo ? (
                <img src={logo} className="m-auto flex-0 basis-1/5" alt="Company" />
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
                to={link}
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
