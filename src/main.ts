import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './routers/Router';
import store from './store/RootStore';
import './registerServiceWorker';
// 引入elementUi
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


