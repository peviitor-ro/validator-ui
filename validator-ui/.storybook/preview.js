/** @type { import('@storybook/react').Preview } */
import '../src/index.css';
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;
