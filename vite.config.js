import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Minify JS with esbuild (default, fastest) — set to 'terser' for
    // maximum compression if you add terser as a dev dependency.
    minify: 'esbuild',

    // Inline CSS into the JS bundle is NOT what we want — keep CSS in
    // separate, minified files (Vite's default; cssCodeSplit: true).
    cssCodeSplit: true,

    // Fine-tune esbuild minification
    esbuildOptions: {
      // Drop console.* and debugger statements from production output
      drop: ['console', 'debugger'],
    },

    rollupOptions: {
      output: {
        // Give chunks and assets predictable, cache-friendly names
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',

        manualChunks(id) {
          // React core — changes least often; long-lived cache
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-is/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }

          // GSAP + all GSAP plugins/utilities
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap';
          }

          // Lenis smooth-scroll
          if (id.includes('node_modules/@studio-freight/lenis/') ||
              id.includes('node_modules/lenis/')) {
            return 'vendor-lenis';
          }

          // Everything else in node_modules → shared vendor chunk
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
