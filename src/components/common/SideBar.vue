<template>
  <mu-drawer :open="open" :docked="docked" @close="toggle()">
    <mu-list @itemClick="docked ? '' : toggle()">
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
      open: false,
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

</style>
