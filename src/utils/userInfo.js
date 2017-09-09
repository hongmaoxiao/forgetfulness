import Cookies from 'js-cookie';

const userInfo = 'user';

const getUserInfo = () => Cookies.getJSON(userInfo);

const setUserInfo = user => Cookies.set(userInfo, user);

const removeUserInfo = () => Cookies.remove(userInfo);

export {
  getUserInfo,
  setUserInfo,
  removeUserInfo,
};
