import Toa from '@/components/common/Toast';

const Toast = {};
Toast.install = (Vue, options) => {
  const isMounted = document.getElementById('toast');
  if (isMounted) {
    return;
  }

  const ToastTpl = Vue.extend(Toa);
  const $vm = new ToastTpl();
  const tpl = $vm.$mount().$el;
  document.body.appendChild(tpl);

  Vue.prototype.$toast = {
    show(opt = options) {
      if (typeof opt === 'string') {
        $vm.message = opt;
      } else if (typeof opt === 'object') {
        Object.assign($vm, opt);
      }
      $vm.show = true;
      setTimeout(() => {
        $vm.show = false;
      }, opt.time ? opt.time : 2000);
    },
    hide() {
      $vm.show = false;
    },
  };
  Vue.toast = Vue.prototype.$toast;
};

export default Toast;
