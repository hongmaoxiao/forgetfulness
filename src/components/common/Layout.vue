<template>
	<div class="app-wrapper">
    <nav-bar @listenToDrawer='toggleDrawer' />
    <side-bar :open='open' :docked='docked' @listenItemClick='toggleItem' />
		<div class="main">
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
  data() {
    return {
      open: true,
      docked: true,
      windowHeight: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.windowWidth = document.body.clientWidth;
      this.ifShowDrawer();
      window.addEventListener('resize', this.resize);
    },
    resize() {
      this.windowWidth = document.body.clientWidth;
      this.ifShowDrawer();
    },
    ifShowDrawer() {
      if (this.windowWidth < 900) {
        this.open = false;
        this.docked = false;
      } else {
        this.open = true;
        this.docked = true;
      }
    },
    toggleDrawer(open) {
      this.open = open;
    },
    toggleItem(open) {
      this.open = open;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>
<style>
.main {
  margin: 0 auto;
  position: relative;
  padding: 2em 30px 2em 286px;
}
@media screen and (max-width: 900px) {
  .main {
    padding-left: 30px;
  }
}
</style>
