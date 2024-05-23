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
    assetsInlineLimit: 0,
    rollupOptions: {
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
        entryFileNames: 'assets/js/main.js',
      }
    }
  },
});
