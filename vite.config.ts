import { fileURLToPath, URL } from 'node:url'

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({resolvers: [NaiveUiResolver()]})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
