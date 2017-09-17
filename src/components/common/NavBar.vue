<template>
  <mu-appbar title="Title">
    <router-link to="/edit" class="to-home">
      首页
    </router-link>
    <mu-flat-button label="历史提醒" slot="right" to='/history' />
    <mu-flat-button label="退出" slot="right" @click="logout" />
  </mu-appbar>
</template>

<script>
import { removeUserInfo } from '@/utils/userInfo';
import { removeAuthToken } from '@/utils/auth';

export default {
  name: 'header',
  methods: {
    logout() {
      removeAuthToken();
      removeUserInfo();
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>
<style>
.to-home {
  position: relative;
  float: left;
}
</style>
