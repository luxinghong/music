import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueVirtualScroller from 'vue-virtual-scroller'

import App from './App.vue';
import router from './router';
import './assets/css/common.css';
import './index.css';

const app = createApp(App)

app.use(createPinia())
app.use(VueVirtualScroller)
app.use(router)


app.mount('#app')
