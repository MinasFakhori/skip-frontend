import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: "jsdom",
    },

    build: {
        manifest: true,
        sourcemap: true,
    },

    base: "./",
    plugins: [
        react()
    ],
});
