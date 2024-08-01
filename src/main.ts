/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import hljsVuePlugin from '@highlightjs/vue-plugin';
import App from './App.vue';
import router from './router';
import { store } from './store';
import i18n from './locales';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import './permission';

import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/lib/common';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);
app.use(hljsVuePlugin);

app.mount('#app');
