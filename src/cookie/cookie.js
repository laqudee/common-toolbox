import Cookies from 'js-cookie'

const config = {
  cookieExpires: 7
}

/**
 * @description 通过参数key获取名为key的cookie值
 * @param {string} key
 * @returns {string | undefined}
 */
export function getCookie(key) {
  if (Cookies.get(key)) {
    return Cookies.get(key)
  } else {
    return ''
  }
}

/**
 * @description 通过参数key设置名为key的cookie值, 并设置cookie过期时间
 * @param {string} key
 * @param {string} value
 * @param {number} expires
 */
export function setCookie(key, value, expires) {
  Cookies.set(key, value, { expires: expires || config.cookieExpires })
}

/**
 * @description 通过参数key删除名为key的cookie
 * @param {string} key
 */
export function removeCookie(key) {
  if (Cookies.get(key)) {
    Cookies.remove(key)
  }
}

/**
 * @description 清除所有cookie
 */
export function clearAllCookies() {
  const cookies = Cookies.get()
  for (let key in cookies) {
    Cookies.remove(key)
  }
}
