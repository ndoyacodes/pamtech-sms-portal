import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import rollupReplace from "@rollup/plugin-replace";
import obfuscatorPlugin from 'rollup-plugin-obfuscator'; // Default import

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');


  return {
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://opessms.yared.codes/',
          changeOrigin: true,
        }
      }
    },
    plugins: [
      rollupReplace({
        preventAssignment: true,
        values: {
          __DEV__: JSON.stringify(true),
          "process.env.NODE_ENV": JSON.stringify("development"),
        },
      }),
      react(),
      mode === 'production' && obfuscatorPlugin({
        options: {
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: false,
          debugProtection: false,
          identifierNamesGenerator: 'hexadecimal',
          selfDefending: true,
          stringArray: true,
          stringArrayThreshold: 0.75
        }
      })
    ].filter(Boolean),
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      sourcemap: false
    }
  };
});