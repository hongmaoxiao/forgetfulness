import Cookies from 'js-cookie';

const AuthToken = 'authtoken';

const getAuthToken = () => Cookies.get(AuthToken);

const setAuthToken = token => Cookies.set(AuthToken, token);

const removeAuthToken = () => Cookies.remove(AuthToken);

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
};
