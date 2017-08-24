<template>
<div class="login-wrapper">
  <div class="login-inner">
    <mu-tabs
      :value="activeTab"
      @change="handleTabChange"
      class="swith-tab"
    >
      <mu-tab value="login" title="登录"/>
      <mu-tab value="register" title="注册"/>
    </mu-tabs>
    <div v-if="activeTab === 'login'">
      <mu-text-field hintText="请输入手机号" v-model="phone" /><br/>
      <mu-text-field hintText="请输入登录密码" type="password" v-model="loginPassword" />

      <div class="login-btn-wrapper">
        <mu-raised-button label="登录" fullWidth class="login-btn" backgroundColor="#53b63d"/>
      </div>
    </div>
    <div v-if="activeTab === 'register'" class="register">
      <span class="send-code">获取验证码</span>
      <mu-text-field hintText="请输入手机号" v-model="phone" /><br/>
      <mu-text-field hintText="请输入验证码" v-model="code" /><br/>
      <mu-text-field hintText="请输入密码" type="password" v-model="registerPassword" />
      <div class="login-btn-wrapper">
        <mu-raised-button label="注册" fullWidth class="register-btn" backgroundColor="#53b63d" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      phone: '',
      loginPassword: '',
      registerPassword: '',
      code: '',
      activeTab: 'login',
    };
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
  },
};
</script>

<style>
  .login-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #e8e8e8;
  }

  .login-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    text-align: left;
  }

  .swith-tab {
    margin-bottom: 25px;
  }

  .send-code {
    border: 1px solid green;
    position: absolute;
    z-index: 10;
    top: 60px;
    right: 10px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    border-radius: 2px;
    padding: 0 10px;
  }

  .register {
    position: relative;
  }

  .login-btn-wrapper {
    margin-top: 10px;
  }
</style>
