import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {API_URL} from '../client/src/config'
import path from 'path'


//const { PORT = 3000 } = process.env;

export default defineConfig({
    plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    server: {
        proxy: {
            '/api': {
                target: API_URL,
                changeOrigin: true,
                secure: false,
            },
            '/auth': {
                target: API_URL,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
