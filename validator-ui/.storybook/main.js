/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-docs',
    ],
    docs: {
        source: {
            type: 'dynamic',
        },
    },
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
export default config;
