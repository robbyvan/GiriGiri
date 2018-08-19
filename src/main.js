import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import router from './router';
import store from './store';

import 'common/scss/index.scss';

Vue.config.productionTip = false;

fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
