import Vue from 'vue';

// 引入elementUi
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './routers/router';
import store from './store/store';
import './registerServiceWorker';

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


