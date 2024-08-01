import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL, VITE_API_URL_PREFIX } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {},
              },
            },
            {
              name: 'prefixIds',
              params: {
                delim: '__',
                prefixIds: true,
                prefixClassNames: true,
              },
            },
          ],
        },
      }),
    ],

    server: {
      port: 3002,
      host: '0.0.0.0',
      proxy: {
        [`${VITE_API_URL_PREFIX}/apisix/admin/`]: {
          target: 'http://192.168.233.11:9180',
          rewrite: (path) => path.replace(/^\/api\/apisix\/admin\//, ''),
        },
        [`${VITE_API_URL_PREFIX}/apisix/control/`]: {
          target: 'http://192.168.233.11:9090',
        },
        [`${VITE_API_URL_PREFIX}/`]: {
          target: 'http://127.0.0.1:3000/',
        },
      },
    },
  };
};
