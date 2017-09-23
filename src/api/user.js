import fetch from '@/utils/fetch';

export default function fetchUserInfo(uid) {
  return fetch({
    url: `/schedule/user/${uid}`,
    method: 'get',
  });
}
