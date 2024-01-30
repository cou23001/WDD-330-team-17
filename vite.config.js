import { resolve } from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        header: resolve(__dirname, 'src/public/partials/header.html'),
        footer: resolve(__dirname, 'src/public/partials/footer.html'),
        listing: resolve(__dirname, 'src/product-listing/index.html'),
      },
    },
  },
});
