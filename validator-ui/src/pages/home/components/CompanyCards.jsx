import { CompanyCard } from './CompanyCard';

export function CompanyCards({ companies }) {
    return (
        <>
            {companies?.map((company, index) => (
                <CompanyCard key={index} data={company} />
            ))}
        </>
    );
}
