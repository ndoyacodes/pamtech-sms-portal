import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import rollupReplace from "@rollup/plugin-replace";
import obfuscatorPlugin from 'rollup-plugin-obfuscator';
import viteImagemin from 'vite-plugin-imagemin';
import imageminWebp from 'imagemin-webp';


export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '')
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
          target: 'https://sms.pamtech.co.tz/',
          changeOrigin: true,
          secure: false
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
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 3,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7, // For PNG
        },
        mozjpeg: {
          quality: 75, // For JPG, JPEG
        },
        pngquant: {
          quality: [0.65, 0.9], // For PNG
          speed: 4,
        },
        svgo: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeEmptyAttrs', active: false },
          ],
        },

        // WebP compression support
        plugins: [
          imageminWebp({
            quality: 75,
          }),
        ],
        filter: (source) =>
          /\.(png|jpe?g|webp)$/i.test(source),
      }),
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