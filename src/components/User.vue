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
import { getUserInfo } from '@/utils/userInfo';

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
      const user = getUserInfo();
      if (user.phone) {
        this.phone = user.phone;
        this.messages = user.messages;
      }
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
