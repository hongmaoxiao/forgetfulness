<template>
	<div class="app-wrapper">
    <nav-bar />
    <side-bar />
		<div :class="main">
      <router-view></router-view>
		</div>
	</div>
</template>
<script>
import NavBar from '@/components/common/NavBar';
import SideBar from '@/components/common/SideBar';

export default {
  name: 'layout',
  components: {
    NavBar,
    SideBar,
  },
};
</script>
<style>
.main {
  margin: 0 auto;
  position: relative;
  padding: 2em;
  padding-left: 256px;
}
@media screen and (max-width: 900px)
.main {
  padding-left: 0;
}
</style>
