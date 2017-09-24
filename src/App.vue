<template>
  <div id="app">
    <router-view></router-view>
    <mu-back-top class="back-to-top" />
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  color: #34495e;
  font-size: 14px;
}

.back-to-top .mu-back-up-default {
  border-radius: 50%;
  background-color: rgba(150, 150, 150, 0.6);
}
</style>
