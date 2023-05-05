import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearAllLocalStorage
} from './localStorage.js'
import { getCookie, setCookie, removeCookie, clearAllCookies } from './cookie.js'

/**
 * @description 清除所有localStorage 和 cookies
 */
function clearAllStorage() {
  clearAllCookies()
  clearAllLocalStorage()
}

export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearAllLocalStorage,
  getCookie,
  setCookie,
  removeCookie,
  clearAllCookies,
  clearAllStorage
}
