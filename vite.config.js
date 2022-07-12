import path from 'path'
import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, 'Vue')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./Vue', import.meta.url))
        }
    },

    build: {
        target: "esnext",
        outDir: 'Resources/assets/build/',
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                //assetFileNames: `[name].[ext]`
            },
            external: ['vue', /primevue\/.+/],
        }
    },
    server: {
        host: 'localhost',
        port: 9087,
    }
})
