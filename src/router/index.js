import Vue from 'vue';
import Router from 'vue-router';
import Forget from '@/components/Forget';
import Login from '@/components/Login';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Forget,
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
