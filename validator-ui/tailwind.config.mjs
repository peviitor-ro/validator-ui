/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        colors: {
            primary: '',
            secondary: '',
            heading: '#0c0c0c',
            subtitle: '#71717a',
            card: '#fff',
            container: '#f3f4f6',
            error: '#ff3333',
        },
        boxShadow: {
            'card-shadow': '0px 2px 5px 0.5px rgba(80, 79, 79, 0.72);',
        },
    },
    plugins: [],
};
