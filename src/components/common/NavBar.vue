<template>
  <mu-appbar title="Title">
    <router-link to="/edit" class="to-home">
      首页
    </router-link>
    <mu-avatar
      slot="right"
      color="#fff"
      backgroundColor="#bdbdbd"
      class="avatar"
      :size="50"
      @click="toggleDropDown()"
    >
      {{username}}
    </mu-avatar>
    <mu-list class="drop-down" v-show="showDropDown">
      <mu-list-item title="个人中心" to="/history" titleClass="list-title"></mu-list-item>
      <hr class="list-divider" />
      <mu-list-item title="退出" @click="logout" titleClass="list-title"></mu-list-item>
    </mu-list>
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
      showDropDown: false,
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
    toggleDropDown() {
      this.showDropDown = !this.showDropDown;
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
  margin-right: 20px;
}

.drop-down {
  padding: 0;
  max-width: 150px;
  background: #ddd;
  z-index: 99999;
  position: absolute;
  top: 64px;
  right: 0px;
  display: inline-block;
  text-align: center;
}

.list-title {
  font-size: 16px;
  line-height: 1.5em;
}

.list-title:hover {
  color: #fff;
}

.list-divider {
  margin: 0;
  height: 1px;
  border: none;
  background-color: rgba(0,0,0,.12);
  width: 100%;
}
</style>
