/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/setupTest.js',
        testTimeout: '10000',
    },
    server: {
        port: 3000,
    },
    optimizeDeps: {
        esbuildOptions: {
            jsx: 'automatic',
        },
    },
});
