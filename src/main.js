import './assets/all.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { LoadingPlugin } from 'vue-loading-overlay';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin);

app.mount('#app');
