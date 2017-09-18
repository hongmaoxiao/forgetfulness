<template>
  <mu-appbar title="Title" class="navbar">
    <mu-icon-button class="drawer-icon" slot="left" icon="dehaze" @click="toggleDrawer"></mu-icon-button>
    <router-link to="/today" class="to-home">
      首页
    </router-link>
    <mu-avatar
      slot="right"
      color="#fff"
      backgroundColor="#af8a8a"
      class="avatar"
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
    toggleDrawer() {
      this.$emit('listenToDrawer', true);
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

.avatar.mu-avatar {
  width: 50px;
  height: 50px;
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
  background: #f5f0f0;
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

.drawer-icon {
  display: none;
}

@media screen and (max-width: 900px) {
  .drawer-icon {
    display: block;
  }

  .to-home {
    margin-left: 0;
  }

  .avatar {
    margin-right: 10px;
  }
}

@media screen and (max-width: 700px) {
  .avatar {
    margin-right: 10px;
  }

  .drop-down {
    max-width: 100px;
    top: 50px;
  }

  .drop-down .mu-item {
    min-height: 30px;
    padding: 8px;
  }

  .list-title {
    font-size: 14px;
  }

  .avatar.mu-avatar {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .navbar .mu-appbar-title {
    padding-left: 0;
  }

  .navbar {
    height: 50px;
    line-height: 50px;
  }

  .navbar .mu-appbar-title {
    line-height: 50px;
  }
}
</style>
