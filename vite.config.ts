// https://github.com/vitejs/vite/discussions/3448
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import jsconfigPaths from 'vite-jsconfig-paths';
//import reactRefresh from "@vitejs/plugin-react-refresh";
import rollupReplace from "@rollup/plugin-replace";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;

  return {
    preview: {
      // this ensures that the browser opens upon server start
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
    // base: API_URL,
    server: {
      proxy: {
        '/api': {
          // target: 'http://localhost:6915',
          target: 'https://opessms.yared.codes/',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
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
      // jsconfigPaths()
    //   NodeModulesPolyfillPlugin({
    //     buffer: true
    // }),
      //reactRefresh(),
    ],
  
  };
});
