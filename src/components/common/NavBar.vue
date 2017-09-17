<template>
  <mu-appbar title="Title" class="navbar">
    <router-link to="/edit" class="to-home">
      首页
    </router-link>
    <mu-avatar
      slot="right"
      color="#fff"
      backgroundColor="#8a8585"
      class="avatar"
      :size="50"
    >
      <span class="username" @click.stop="toggleDropDown">{{username}}</span>
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
      target: false,
    };
  },
  created() {
    this.getUserName();
    window.addEventListener('click', this.hideDropDown);
  },
  methods: {
    getUserName() {
      const user = getUserInfo();
      if (user.phone) {
        this.username = user.phone.slice(user.phone.length - 2);
      }
    },
    hideDropDown() {
      this.showDropDown = false;
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
  margin-left: 20px;
  color: #fff;
}

.avatar {
  margin-right: 20px;
}

.username {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.drop-down {
  padding: 0;
  max-width: 150px;
  background: #ddd;
  z-index: 99999;
  position: absolute;
  top: 70px;
  right: 0px;
  display: inline-block;
  text-align: center;
}

.list-title {
  font-size: 16px;
  line-height: 1.5em;
}

.drop-down .mu-item-wrapper:hover .list-title {
  color: #fff;
}

.list-divider {
  margin: 0;
  height: 1px;
  margin-top: 1px;
  border: none;
  background-color: rgba(0,0,0,.12);
  width: 100%;
}

.navbar {
    height: 70px;
    line-height: 70px;
}

.navbar .mu-appbar-title {
  line-height: 70px;
}

.navbar-title {
  color: #fff;
}
</style>
