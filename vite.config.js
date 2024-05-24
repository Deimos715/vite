import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    copy({
      targets: [
        { src: 'src/fonts/*', dest: 'dist/assets/fonts' },
        { src: 'src/img/*', dest: 'dist/assets/img' },

      ],
      hook: 'writeBundle'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/img'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        exemple: path.resolve(__dirname, 'exemple.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          if (/ttf|otf|woff|woff2/i.test(extType)) {
            return 'assets/fonts/[name][extname]';
          }
          if (/css/i.test(extType)) {
            return 'assets/css/style.css';
          }
          if (/png|jpe?g|gif|svg|webp/i.test(extType)) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/main.js', //Для одной страницы
        // entryFileNames: 'assets/js/main.js', //Для 2-х и более страниц
      }
    }
  },
});
