import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {API_URL} from '../client/src/config'


//const { PORT = 3000 } = process.env;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: `${API_URL}`,
                changeOrigin: true,
                secure: false,
            },
            '/auth': {
                target: `${API_URL}`,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
        },
});
