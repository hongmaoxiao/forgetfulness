<template>
  <div class="loading-wrapper">
    <mu-circular-progress :size="60" :strokeWidth="5" class="loading" :color="loadingColor" />
  </div>
</template>

<script>

export default {
  name: 'loading',
  data() {
    return {
      loadingColor: '#13ce66',
    };
  },
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
