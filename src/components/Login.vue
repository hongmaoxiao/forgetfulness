<template>
<div class="full-page login-wrapper">
  <div class="login-inner vertical-center">
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
      <mu-text-field hintText="手机号" v-model.trim="phone" /><br/>
      <mu-text-field hintText="登录密码" type="password" v-model.trim="loginPassword" /><br/>
      <mu-text-field hintText="图片验证码" v-model.trim="verifyCode" />

      <div class="login-btn-wrapper">
        <mu-raised-button @click="login()" label="登录" fullWidth class="login-btn" backgroundColor="#53b63d"/>
      </div>
    </div>
    <div v-if="activeTab === 'register'" class="register">
      <p class="send-code">
        <span :class="[getcode, { resend: isDisable }]" @click="reg('get_phone_code')">{{countText}}</span>
      </p>
      <mu-text-field hintText="手机号" v-model.trim="phone" /><br/>
      <mu-text-field hintText="短信验证码" v-model.trim="phoneCode" /><br/>
      <mu-text-field hintText="密码" type="password" v-model.trim="registerPassword" /><br/>
      <mu-text-field hintText="确认密码" type="password" v-model.trim="rePassword" />
      <div class="login-btn-wrapper">
        <mu-raised-button @click="reg()" label="注册" fullWidth class="register-btn" backgroundColor="#53b63d" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'qs';
import { setAuthToken } from '@/utils/auth';
import { setUserInfo } from '@/utils/userInfo';
import {
  fetchCaptchaCode,
  loginVerification,
  registerVerification,
  fetchPhoneCode,
} from '@/api/login';

export default {
  name: 'login',
  data() {
    return {
      phone: '',
      loginPassword: '',
      registerPassword: '',
      rePassword: '',
      phoneCode: '',
      activeTab: 'login',
      captcha: null,
      verifyCode: '',
      countdown: 60,
      countText: '获取验证码',
      getcode: 'getcode',
      isDisable: false,
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    hideCountDown() {
      this.countdown = 60;
      this.isDisable = false;
      this.countText = '发送验证码';
    },
    showCountDown() {
      if (this.countdown !== 60) {
        this.countdown = 60;
      }
      this.countDown();
      this.isDisable = true;
    },
    beforeRegisterSubmit() {
      return !!(this.phone && this.phoneCode
      && this.registerPassword && this.rePassword);
    },
    postRegister() {
      if (!this.beforeRegisterSubmit()) {
        this.$toast.show('注册信息填写不全！');
        return;
      }
      if (this.registerPassword !== this.rePassword) {
        this.registerPassword = '';
        this.rePassword = '';
        this.$toast.show('两次的密码不一致！');
        return;
      }
      const data = {
        code: this.phoneCode,
        phone: this.phone,
        password: this.registerPassword,
        repassword: this.rePassword,
      };
      registerVerification(data).then((res) => {
        const code = res.code;
        if (code === 200) {
          if (res.token) {
            setAuthToken(res.token);
            setUserInfo(res.user);
            this.$toast.show('注册成功！');
            this.loginSuccess();
          }
        } else {
          if (code === 202 || code === 203) {
            this.loginPassword = '';
          } else if (code === 206) {
            this.registerPassword = '';
            this.rePassword = '';
            this.phoneCode = '';
          }
          this.hideCountDown();
          this.$toast.show(res.msg);
        }
      })
      .catch(() => {
        this.hideCountDown();
      });
    },
    reg(code) {
      if (code === 'get_phone_code') {
        this.getPhoneCode(code);
      } else {
        this.postRegister();
      }
    },
    login() {
      if (!/\d{6}/.test(this.verifyCode)) {
        this.$toast.show('图片验证码须为6位数字!');
        return;
      }
      const data = {
        code: this.verifyCode,
        phone: this.phone,
        password: this.loginPassword,
      };
      loginVerification(data).then((res) => {
        const code = res.code;
        if (code === 200) {
          if (res.token) {
            setAuthToken(res.token);
            setUserInfo(res.user);
            this.loginSuccess();
          }
        } else {
          if (code === 203 || code === 206) {
            this.loginPassword = '';
          }
          this.verifyCode = '';
          this.$toast.show(res.msg);
          this.getCaptcha();
        }
      });
    },
    getCaptcha() {
      fetchCaptchaCode().then((res) => {
        if (res.code === 200) {
          this.captcha = res.captcha;
        } else {
          if (this.verifyCode) {
            this.verifyCode = '';
          }
          this.$toast.show(res.msg ? res.msg : '验证码获取失败！');
        }
      });
    },
    handleTabChange(val) {
      this.activeTab = val;
    },
    getPhoneCode(phoneCode) {
      if (!this.phone) {
        this.$toast.show('请先输入手机号码！');
        return;
      }
      this.showCountDown();
      const data = qs.stringify({
        phone: this.phone,
        code: phoneCode,
      });
      fetchPhoneCode(data).then((res) => {
        const code = res.code;
        if (code === 200) {
          this.$toast.show('短信已经发送到您的手机，请注意查收！');
        } else {
          if (this.phoneCode) {
            this.phoneCode = '';
          }
          this.$toast.show(res.msg);
        }
      });
    },
    countDown() {
      if (+this.countdown === 0) {
        this.hideCountDown();
      } else {
        this.countdown -= 1;
        this.countText = `${this.countdown}秒后重新发送`;
        setTimeout(this.countDown, 1000);
      }
    },
    loginSuccess() {
      this.$toast.show({
        message: '登录成功！',
        time: 1000,
      });
      setTimeout(() => {
        this.$router.push({ name: 'today' });
      }, 500);
    },
  },
};
</script>

<style>
  .login-wrapper {
    background: #e8e8e8;
  }

  .login-inner {
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
  @media screen and (max-width: 900px) {
    .login-inner {
      padding: 15px;
    }
  }
</style>
