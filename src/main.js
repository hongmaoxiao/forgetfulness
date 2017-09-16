import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueCookie from 'vue-cookie';
import '@/assets/css/basic.css';
import App from '@/App';
import router from '@/router';
import Toast from '@/plugin/toast';

Vue.config.productionTip = false;
Vue.use(MuseUI);
Vue.use(VueCookie);
Vue.use(Toast);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
