export const NAV_LINKS = Object.freeze([
    {
        name: 'Cont',
        url: '/account',
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
]);
