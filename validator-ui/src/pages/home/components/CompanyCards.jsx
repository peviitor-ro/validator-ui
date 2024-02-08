import { CompanyCard } from './CompanyCard';

export function CompanyCards({ companies }) {
    if (!companies?.length) {
        return <>no companies</>;
    }

    return (
        <>
            {companies?.map((company, index) => (
                <CompanyCard key={index} data={company} />
            ))}
        </>
    );
}
