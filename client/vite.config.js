import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { API_URL } from './src/config'
import * as dotenv from 'dotenv';
dotenv.config({path: '../server/.env'}); 

//const { PORT = 3000 } = process.env;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL || 'https://your-backend-service.onrender.com',
                changeOrigin: true,
                secure: false,
            },
            '/auth': {
                target: process.env.VITE_API_URL || 'https://your-backend-service.onrender.com',
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
