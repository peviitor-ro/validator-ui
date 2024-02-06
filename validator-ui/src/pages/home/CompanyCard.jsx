import { NavLink } from 'react-router-dom';

export function CompanyCard({ data }) {
    const { name, description, image, link, externalLink, jobsCount } = data;

    return (
        <article className="card flex flex-col h-[400px]">
            <img src={image} className="m-auto flex-0 basis-1/5" alt="Company" />

            <h3 className="text-center mb-6 uppercase">{name}</h3>

            <p className="line-clamp-2 mb-6 break-all">{description}</p>

            <NavLink to={link} className="btn btn-primary text-center mb-2">
                Vizualizeaza Joburi ({jobsCount})
            </NavLink>

            <a href={externalLink} className="btn btn-primary-outlined text-center">
                Vizualizeaza WebSite
            </a>
        </article>
    );
}
