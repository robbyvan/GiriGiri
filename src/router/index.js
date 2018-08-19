import Vue from 'vue';
import Router from 'vue-router';

import Home from 'components/home/home';
import Search from 'components/search/search';
import User from 'components/user/user';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/user',
      component: User,
    },
  ]
});
