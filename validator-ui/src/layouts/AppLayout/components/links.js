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
        onClick: () => {
            const search = document.getElementById('search');
            search.focus();
        },
    },
    {
        name: 'Despre',
        url: 'https://oportunitatisicariere.ro/',
    },
    {
        name: 'Documentatie',
        url: 'https://adminpeviitordocs.netlify.app/',
    },
]);
