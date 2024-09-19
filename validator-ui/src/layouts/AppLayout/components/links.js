export const NAV_LINKS = Object.freeze([
    {
        name: 'Cont',
        url: '/account',
    },
    {
        name: 'Companii',
        url: '/',
    },
    {
        name: 'Scraperi',
        url: '/scraper',
    },
    {
        name: 'Cautare',
        url: window.location,
        onClick: () => {
            const element = document.getElementById('search-container');
            const search = document.getElementById('search');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end' });
                setTimeout(() => {
                    search.focus();
                }, 1000);
            }
        },
    },
    {
        name: 'Despre',
        url: 'https://oportunitatisicariere.ro/',
    },
    {
        name: 'Contact',
        url: 'mailto:aocpeviitor@gmail.com',
    },
    {
        name: 'Documentatie',
        url: 'https://adminpeviitordocs.netlify.app/',
    },
]);
