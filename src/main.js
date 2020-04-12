import Vue from 'vue';
import router from './router';
import BootstrapVue from "bootstrap-vue";
import App from './App';
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import './config/msgs';
import './config/axios';
import store from './config/store';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import moment from 'moment';
import VueMoment from 'vue-moment';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Datetime);


require('moment/locale/pt-br');
moment.locale('pt-br');

Vue.use(VueMoment, { moment });

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
