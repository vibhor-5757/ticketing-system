import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createRequire } from 'module';

// Create a require function for importing modules
const require = createRequire(import.meta.url);
const { Buffer } = require('buffer');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/', // Alias for buffer package
    },
  },
  define: {
    global: 'window', // Define global as window
    'process.env': {}, // Define process.env as an empty object
    Buffer: Buffer, // Make Buffer available globally
  },
});
