import Vue from 'vue';
import Router from 'vue-router';
import Forget from '@/components/Forget';
import Login from '@/components/Login';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    }, {
      path: '/edit',
      name: 'edit',
      component: Forget,
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
