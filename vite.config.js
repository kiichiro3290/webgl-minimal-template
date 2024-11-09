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
                'sample1': resolve(root, 'fragment', 'index.html'),
                'sample2': resolve(root, '3D', 'index.html'),
            },
        },
    },
});