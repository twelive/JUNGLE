import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { env } from 'node:process';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

const idDev = env.NODE_ENV === 'development';

// 빌드 시 이미지 최적화, 청크 파일 생성 미작성 -> 추후 작성 예정

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: idDev
        ? '[name]_[local]__[hash:base64:5]'
        : '[hash:base64:4]',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@layout': resolve(__dirname, './src/layout'),
      '@pages': resolve(__dirname, './src/pages'),
      '@store': resolve(__dirname, './src/store'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
});
