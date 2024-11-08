import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
    root,
    build: {
        outDir,
        rollupOptions: {
            input: {
                'index': resolve(root, 'index.html'),
                'sample1': resolve(root, 'fragment2D', 'index.html'),
            },
        },
    },
});