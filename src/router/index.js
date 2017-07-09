import Vue from 'vue';
import Router from 'vue-router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Forget from '@/components/Forget';

Vue.use(Router);
Vue.use(MuseUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Forget,
    },
  ],
});
