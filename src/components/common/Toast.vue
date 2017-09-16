<template>
  <div id="toast">
    <mu-toast v-if="show" class="toast-bar" :class="position" :message="message" />
  </div>
</template>

<script>

export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: '努力加载中...',
      require: true,
    },
    show: {
      type: Boolean,
      default: false,
      require: true,
    },
    position: {
      type: String,
      default: 'center',
      require: true,
    },
  },
};
</script>

<style scoped>
#toast {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.toast-bar {
  position: absolute;
  text-align: center;
  left: 50%;
  width: 300px;
  transform: translateX(-50%);
}

.toast-bar.top {
  top: 10%;
}

.toast-bar.center {
  top: 50%;
  transform: translate(-50%, -50%);
}

.toast-bar.bottom {
  top: 90%;
}
</style>
