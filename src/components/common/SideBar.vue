<template>
  <mu-drawer class="sidebar-drawer" :open="open" :docked="docked" @close="toggle()">
    <mu-list class="sidebar-list" @itemClick="docked ? '' : toggle()">
      <mu-list-item title="今日提醒" to="/today" titleClass="list-title"></mu-list-item>
      <mu-list-item title="历史提醒" to="/history" titleClass="list-title"></mu-list-item>
    </mu-list>
  </mu-drawer>
</template>

<script>

export default {
  name: 'sidebar',
  data() {
    return {
      docked: true,
      open: true,
    };
  },
  methods: {
    toggle(flag) {
      this.open = !this.open;
      this.docked = !flag;
    },
  },
};
</script>
<style>
.sidebar-drawer {
  top: 70px;
}

.sidebar-list {
  padding: 20px 0;
  font-size: 18px;
}
.sidebar-list .list-title {
  font-size: 18px;
  padding-left: 20px;
}
</style>
