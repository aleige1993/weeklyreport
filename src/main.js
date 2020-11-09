import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index'
import '../src/assets/css/reset.css'
import HttpApi from '../src/assets/js/Formdata.js'
const app = createApp(App)
app.config.globalProperties.$HttpApi = HttpApi
app.use(App);
app.use(store);
app.use(router);
app.use(Vant);
app.mount('#app');
// createApp(App).use(store).use(router).use(Vant).mount('#app')