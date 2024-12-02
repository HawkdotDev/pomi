import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true, // Enables protocol imports like "node:fs"
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
});
