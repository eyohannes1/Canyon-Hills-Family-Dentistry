import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                services: './services.html',
            },
        },
    },
    server: {
        port: 8080,
        proxy: {
            '/api/reviews': {
                target: 'https://places.googleapis.com',
                changeOrigin: true,
                rewrite: () => '/v1/places/ChIJEXpONE1uK4cRyQd4JggwFPQ?fields=rating,userRatingCount&key=AIzaSyD55N9RfI9ARcs7vONVd0U7DsFfthhJ0oY',
            },
        },
    },
});
