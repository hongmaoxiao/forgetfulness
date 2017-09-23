<template>
  <div class="userinfo">
    <mu-content-block>
      <p class="info-wrapper">
        <span>手机号：</span>
        <em>{{phone}}</em>
      </p>
    </mu-content-block>
    <mu-content-block>
      <p class="info-wrapper">
        <span>短信余额：</span>
        <em>{{messages}}条</em>
      </p>
    </mu-content-block>
  </div>
</template>

<script>
import fetchUserInfo from '@/api/user';
import { getUserInfo, setUserInfo } from '@/utils/userInfo';

export default {
  name: 'User',
  data() {
    return {
      phone: null,
      messages: 20,
    };
  },
  created() {
    this.assignUserInfo();
  },
  methods: {
    assignUserInfo() {
      const olduser = getUserInfo();
      this.fetchUserData(olduser);
    },
    fetchUserData(olduser) {
      fetchUserInfo(olduser.id).then((res) => {
        if (res.code === 200) {
          const user = res.user;
          this.phone = user.phone;
          this.messages = user.messages;
          if (+olduser.messages !== +user.messages) {
            setUserInfo(user);
          }
        } else {
          this.$toast.show(res.msg);
        }
      });
    },
  },
};
</script>

<style>
.info-wrapper span {
  font-size: 16px;
  display: inline-block;
  width: 100px;
}

.info-wrapper em {
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
}
</style>
