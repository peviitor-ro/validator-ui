/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        colors: {
            primary: '#db7900',
            heading: '#0c0c0c',
            subtitle: '#71717a',
            card: '#fff',
            container: '#f3f4f6',
            error: '#ff3333',
            disabled: '#e5e5e5',
        },

        extend: {
            boxShadow: {
                '3xl': '0px 4px 10px -2px #71717a',
            },
            gridTemplateColumns: {
                minmax: 'repeat(auto-fill, minmax(min(270px,45vw), 1fr))',
                fixed: '1fr 200px',
            },
        },
    },
    plugins: [],
};
