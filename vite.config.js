import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
