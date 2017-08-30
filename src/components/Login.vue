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
    <div v-if="activeTab === 'login'" class="login">
      <img :src="captcha" alt="captcha" class="captcha" @click="getCaptcha()">
      <mu-text-field hintText="手机号" v-model="phone" /><br/>
      <mu-text-field hintText="登录密码" type="password" v-model="loginPassword" /><br/>
      <mu-text-field hintText="图片验证码" type="text" v-model="verifyCode" />

      <div class="login-btn-wrapper">
        <mu-raised-button @click="login()" label="登录" fullWidth class="login-btn" backgroundColor="#53b63d"/>
      </div>
    </div>
    <div v-if="activeTab === 'register'" class="register">
      <p class="send-code">
        <span v-show="countdown === 0" class="getcode" @click="reg('get_phone_code')">获取验证码</span>
        <span v-show="countdown > 0" class="resend">{{countdown}}秒后重试</span>
      </p>
      <mu-text-field hintText="手机号" v-model="phone" /><br/>
      <mu-text-field hintText="短信验证码" v-model="code" /><br/>
      <mu-text-field hintText="密码" type="password" v-model="registerPassword" /><br/>
      <mu-text-field hintText="确认密码" type="password" v-model="rePassword" />
      <div class="login-btn-wrapper">
        <mu-raised-button @click="reg()" label="注册" fullWidth class="register-btn" backgroundColor="#53b63d" />
      </div>
    </div>
    <mu-toast v-if="toast" class="toast-bar" :message="toastMessage" @close="hideToast"/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'login',
  data() {
    return {
      phone: '',
      loginPassword: '',
      registerPassword: '',
      rePassword: '',
      code: '',
      activeTab: 'login',
      toast: false,
      toastMessage: '',
      toastTimer: null,
      captcha: null,
      verifyCode: '',
      countdown: 0,
    };
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    beforeRegisterSubmit() {
      return !!(this.phone && this.code
      && this.registerPassword && this.rePassword);
    },
    postRegister() {
      if (!this.beforeRegisterSubmit()) {
        this.showToast('注册信息填写不全！');
        return;
      }
      if (this.registerPassword !== this.rePassword) {
        this.registerPassword = '';
        this.rePassword = '';
        this.showToast('两次的密码不一致！');
        return;
      }
      axios.post('/schedule/register', {
        code: this.code,
        phone: this.phone,
        password: this.registerPassword,
        repassword: this.rePassword,
      })
      .then(
        (response) => {
          console.log('register: ', response);
          const data = response.data;
          const status = response.status;
          if (status === 200) {
            console.log('success');
          } else {
            if (status === 202 || status === 203) {
              this.code = '';
            } else if (status === 206) {
              this.registerPassword = '';
              this.rePassword = '';
              this.code = '';
            }
            this.showToast(data.msg);
          }
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
          this.showToast('网络请求错误，请稍后再试！');
        },
      );
    },
    reg(code) {
      if (code === 'get_phone_code') {
        this.getPhoneCode(code);
        this.countdown = 60;
        this.countDown();
      } else {
        this.postRegister();
      }
    },
    login() {
      console.log('verifyCode: ', this.verifyCode);
      axios.post('/schedule/login', {
        code: this.verifyCode,
        phone: this.phone,
        password: this.loginPassword,
      })
      .then(
        (response) => {
          console.log('login: ', response);
          const data = response.data;
          const status = response.status;
          if (status === 200) {
            console.log('success');
          } else {
            if (status === 203 || status === 206) {
              this.loginPassword = '';
            }
            this.verifyCode = '';
            this.showToast(data.msg);
            this.getCaptcha();
          }
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
          this.showToast('网络请求错误，请稍后再试！');
        },
      );
    },
    getCaptcha() {
      axios.get(`/schedule/login?t=${+new Date()}`)
      .then(
        (response) => {
          const data = response.data;
          if (response.status === 200) {
            this.captcha = data.captcha;
          } else {
            if (this.verifyCode) {
              this.verifyCode = '';
            }
            this.showToast(data.msg);
          }
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
          this.showToast('网络请求错误，请稍后再试！');
        },
      );
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    showToast(message) {
      this.toastMessage = message;
      this.toast = true;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    getPhoneCode(code) {
      if (!this.phone) {
        this.showToast('请先输入手机号码！');
        return;
      }
      axios.post('/schedule/register', qs.stringify({
        phone: this.phone,
        code,
      }))
      .then(
        (response) => {
          const data = response.data;
          console.log('regcode: ', data);
          if (response.status === 200) {
            console.log('success');
          } else {
            if (this.code) {
              this.code = '';
            }
            this.showToast(data.msg);
          }
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
          this.showToast('网络请求错误，请稍后再试！');
        },
      );
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
    },
    countDown() {
      if (this.countdown === 0) {
        this.countdown = 60;
      } else {
        this.countdown -= 1;
        setTimeout(this.countDown, 1000);
      }
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
    top: 54px;
    right: 0;
    height: 35px;
    line-height: 35px;
    border-radius: 2px;
    margin: 0;
  }

  .send-code > span {
    padding: 0 10px;
    display: block;
  }

  .getcode {
    cursor: pointer;
  }

  .resend {
    cursor: not-allowed;
  }

  .login,
  .register {
    position: relative;
  }

  .login-btn-wrapper {
    margin-top: 10px;
  }

  .toast-bar {
    text-align: center;
  }

  .captcha {
    border: 1px solid #ddd;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    top: 107px;
    right: 0;
    cursor: pointer;
    border-radius: 2px;
    padding: 0 10px;
  }
</style>
