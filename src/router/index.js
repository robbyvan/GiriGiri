import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ 'components/home/home');
const HomeDetail = () => import(/* webpackChunkName: "home-detail" */ 'components/home-detail/home-detail');
const Rank = () => import(/* webpackChunkName: "rank" */ 'components/rank/rank');
const Video = () => import(/* webpackChunkName: "video" */ 'components/video/video');
const Search = () => import(/* webpackChunkName: "search" */ 'components/search/search');
const SearchResult = () => import(/* webpackChunkName: "search-result" */ 'components/search-result/search-result');
const User = () => import(/* webpackChunkName: "user" */ 'components/user/user');
const Recent = () => import(/* webpackChunkName: "recent" */ 'components/user/recent');

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
    {
      path: '/user',
      component: Recent,
    },
    { path: '/user/:mid', component: User }
  ]
});
