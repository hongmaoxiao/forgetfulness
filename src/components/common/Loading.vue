<template>
  <div class="full-page">
    <mu-circular-progress :size="60" :strokeWidth="5" class="vertical-center" :color="loadingColor" />
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
