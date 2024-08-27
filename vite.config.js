import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: ['resources/views/**'],
        }),
        react(),

    ],
    server: {
        open: true, // Mở trình duyệt tự động khi chạy
        hmr: {
            host: 'localhost', // Hoặc địa chỉ IP của bạn
        },
        watch: {
            usePolling: true
        }
    },
});
