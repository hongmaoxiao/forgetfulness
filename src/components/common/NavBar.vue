<template>
  <mu-appbar title="Title">
    <router-link to="/edit" class="to-home">
      首页
    </router-link>
    <mu-flat-button label="历史提醒" slot="right" to='/history' />
    <mu-avatar slot="right" color="#fff" backgroundColor="#bdbdbd" class="avatar">{{username}}</mu-avatar>
    <mu-flat-button label="退出" slot="right" @click="logout" />
  </mu-appbar>
</template>

<script>
import { getUserInfo, removeUserInfo } from '@/utils/userInfo';
import { removeAuthToken } from '@/utils/auth';

export default {
  name: 'header',
  data() {
    return {
      username: '',
    };
  },
  created() {
    this.getUserName();
  },
  methods: {
    getUserName() {
      const user = getUserInfo();
      if (user.phone) {
        this.username = user.phone.slice(user.phone.length - 2);
      }
    },
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

.avatar {
  cursor: pointer;
}
</style>
