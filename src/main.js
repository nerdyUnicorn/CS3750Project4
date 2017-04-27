import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Toast from 'vue-easy-toast';

import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store';

// Use HighStock
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Toast);
Vue.use(VueHighcharts, { Highcharts });

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  mode: 'history',
  routes // use the routes imported above
});


new Vue({
  el: '#app',
  router, // VueRouter added to our Vue instance
  store,
  render: h => h(App)
})
