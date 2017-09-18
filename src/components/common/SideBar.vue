<template>
  <mu-drawer class="sidebar-drawer" :open="open" :docked="docked" @close="toggle">
    <mu-list class="sidebar-list" @itemClick="toggle">
      <mu-list-item title="今日提醒" to="/today" titleClass="list-title"></mu-list-item>
      <mu-list-item title="历史提醒" to="/history" titleClass="list-title"></mu-list-item>
    </mu-list>
  </mu-drawer>
</template>

<script>

export default {
  name: 'sidebar',
  props: {
    open: {
      type: Boolean,
      default: true,
      require: true,
    },
    docked: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  methods: {
    toggle() {
      if (!this.docked) {
        this.$emit('listenItemClick', false);
      }
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

.sidebar-list .mu-item:hover .list-title {
    color: #fff;
}

.sidebar-list .list-title {
  font-size: 18px;
  padding-left: 20px;
}

@media screen and (max-width: 700px) {
  .sidebar-drawer {
    width: 150px;
    top: 50px;
  }

  .sidebar-list .mu-item {
    padding: 10px 17px;
    min-height: 35px;
  }
}
</style>
