/* eslint-disable prefer-promise-reject-errors */
import Taro from '@tarojs/taro';

export const setItem = (key, value) => {
  try{
    Taro.setStorageSync(key, value)
  }catch (e) {

  }
}

export const getItem = (key) => {
  try{
    return Taro.getStorageSync(key)
  }catch (e) {}
}

export const removeItem = (key) => {
  try {
    Taro.removeStorageSync(key)
  }catch (e){}
};

export const getItemKeys = () => {
  try {
    return Taro.getStorageInfoSync()
  }catch (e){}
};

export const clearAllItems = () => {
  try {
    Taro.clearStorageSync()
  } catch(e) {
  }
};
