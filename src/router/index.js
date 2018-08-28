import Vue from 'vue';
import Router from 'vue-router';

import Home from 'components/home/home';
import HomeDetail from 'components/home-detail/home-detail';
import Rank from 'components/rank/rank';
import Video from 'components/video/video';
import Search from 'components/search/search';
import SearchResult from 'components/search-result/search-result';
import User from 'components/user/user';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/home/0' },
    {
      path: '/home',
      redirect: '/home/0',
      component: Home,
      children: [ { path: ':rid', component: HomeDetail } ]
    },
    { path: '/rank/:rid', component: Rank },
    { path: '/video/:aid', component: Video },
    {
      path: '/search',
      component: Search,
      children: [
        { path: ':keyword', component: SearchResult }
      ]
    },
    { path: '/user', component: User },
  ]
});
