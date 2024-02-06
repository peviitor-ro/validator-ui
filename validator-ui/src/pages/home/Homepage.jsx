import { Container } from '../../components/Container';
import Loading from '../../components/Loading';
import { useCompaniesQuery } from '../../services/landing/landing.queries';
import { CompanyCard } from './CompanyCard';

const firme = [
    {
        id: 1,
        name: 'Veeam',
        image: 'https://img.veeam.com/careers/logo/veeam/veeam_logo_bg.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem',
        link: '#',
        externalLink: '',
        jobsCount: 15,
    },
    {
        id: 2,
        name: 'Banca Transilvania',
        image: 'https://www.bancatransilvania.ro/themes/bancatransilvania/assets/images/logos/bt-cariere.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        link: '#',
        externalLink: '',
        jobsCount: 15,
    },
    {
        id: 3,
        name: 'Coca-Cola Romania',
        image: 'https://careers.coca-colahellenic.com/portal/5/images/logo.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        link: '#',
        externalLink: '',
        jobsCount: 15,
    },
    {
        id: 4,
        name: 'Dedeman',
        image: 'https://i.dedeman.ro/dedereact/design/images/logo.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        link: '#',
        externalLink: '',
        jobsCount: 15,
    },
    {
        id: 5,
        name: 'Schneider Electric',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Schneider_Electric_2007.svg/284px-Schneider_Electric_2007.svg.png?20150906005100',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        link: '#',
        externalLink: '',
        jobsCount: 15,
    },
];

// TODO: Generic No data component, Generic error component ??,
// TODO: Generic filter components
// TODO: Generic loading component

export function Homepage() {
    const { data, isLoading, isError } = useCompaniesQuery();

    if (isLoading) {
        return (
            <Container className="flex">
                <span className="w-28 h-28 m-auto">
                    <Loading />
                </span>
            </Container>
        );
    }

    if (isError) {
        return <>error...</>;
    }

    if (!data || !data?.length) {
        return <>No data</>;
    }

    return (
        <main className="p-4 lg:p-10">
            <div className="mb-4 lg:mb-10">
                <h2 className="text-4xl">Companii</h2>
                <p className="font-semibold">600 de rezultate</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {firme.map((item) => (
                    <CompanyCard key={item.id} data={item} />
                ))}
            </div>
        </main>
    );
}
