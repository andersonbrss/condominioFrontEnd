import Vue from 'vue';
import router from './router';
import BootstrapVue from "bootstrap-vue";
import App from './App';
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import './config/msgs';
import './config/axios';
import store from './config/store';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
