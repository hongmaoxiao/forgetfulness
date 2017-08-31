// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueCookie from 'vue-cookie';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(MuseUI);
Vue.use(VueCookie);

const checkLogin = ['edit'];

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const mysession = VueCookie.get('uid');
  if (to.name === 'login' && mysession) {
    router.push('edit');
  }
  if (checkLogin.indexOf(to.name) > -1) {
    if (mysession) {
      next();
    } else {
      router.push('login');
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
