import fetch from '@/utils/fetch';

const fetchCaptchaCode = () => fetch({
  url: `/schedule/login?t=${+new Date()}`,
  method: 'get',
});

const loginVerification = data => fetch({
  url: '/schedule/login',
  method: 'post',
  data,
});

const quickLoginVerification = data => fetch({
  url: '/schedule/quicklogin',
  method: 'post',
  data,
});

const registerVerification = data => fetch({
  url: '/schedule/register',
  method: 'post',
  data,
});

const fetchPhoneCode = data => fetch({
  url: '/schedule/register',
  method: 'post',
  data,
});

export {
  fetchCaptchaCode,
  loginVerification,
  quickLoginVerification,
  registerVerification,
  fetchPhoneCode,
};
