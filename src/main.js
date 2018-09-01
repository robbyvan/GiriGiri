import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
// import VConsole from 'vconsole';

import 'common/scss/index.scss';

Vue.config.productionTip = false;
/* eslint-disable no-unused-vars */
// const vConsole = new VConsole();

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/img/lazy2.gif')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
