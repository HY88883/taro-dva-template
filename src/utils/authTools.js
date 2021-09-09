import {clearAllItems, getItem, removeItem, setItem} from "@/utils/storageTools"

export function setAuthority(authority) {
  const proAuthority =
    typeof authority === 'string'
      ? authority.split(',')
      : typeof authority === 'undefined'
      ? null
      : authority;

  setItem('sword-authority', JSON.stringify(proAuthority));
}

export function getToken() {
  return getItem('sword-token') || '';
}

export function setToken(token) {
  setItem('sword-token', token);
}

export function getAccessToken() {
  return getItem('sword-access-token');
}

export function setAccessToken(accessToken) {
  setItem('sword-access-token', accessToken);
}

export function getReflushToken() {
  return getItem('sword-reflush-token');
}

export function setReflushToken(accessToken) {
  setItem('sword-reflush-token', accessToken);
}


export function setCurrentUser(account) {
  setItem('sword-current-user', JSON.stringify(account));
}

export function getCurrentUser() {
  return getItem('sword-current-user')
}

export function getVerificateUser() {
  return getItem('verificate-current-user')
}

export function setVerificateUser(id) {
  setItem('verificate-current-user', id);
}


export function setCaptchaKey(key) {
  removeItem('sword-captcha-key');
  setItem('sword-captcha-key', key);
}

export function getCaptchaKey() {
  return getItem('sword-captcha-key');
}

export function removeAll() {
  clearAllItems()
}
