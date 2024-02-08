import { CompanyCard } from './CompanyCard';

export function CompanyCards({ companies }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {companies?.map((company, index) => (
                <CompanyCard key={index} data={company} />
            ))}
        </div>
    );
}
