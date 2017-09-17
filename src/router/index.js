import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/common/Layout';
import Today from '@/components/Today';
import Login from '@/components/Login';
import History from '@/components/HistorySchedule';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Login,
    }, {
      path: '/today',
      redirect: '/today/index',
      component: Layout,
      children: [{ path: 'index', component: Today, name: 'today' }],
    }, {
      path: '/history',
      redirect: '/history/index',
      component: Layout,
      children: [{ path: 'index', component: History, name: 'history' }],
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
