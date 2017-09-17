import Vue from 'vue';
import Router from 'vue-router';
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
      path: '/edit',
      name: 'edit',
      component: Today,
    }, {
      path: '/history',
      name: 'history',
      component: History,
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
