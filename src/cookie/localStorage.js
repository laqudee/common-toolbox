/**
 * @description 获取localStorage中键名为key的值
 * @param {string} key
 * @returns {object | undefined}
 */
export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

/**
 * @description 通过参数key向localStorage中存储为键名为key的值
 * @param {string} key
 * @param {string | object} value
 */
export function setLocalStorage(key, value) {
  if (value && typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * @description 通过参数key从localStorage中删除键名为key的值
 * @param {string} key
 */
export function removeLocalStorage(key) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key)
  }
}

/**
 * @description 清除localStorage
 */
export function clearAllLocalStorage() {
  localStorage.clear()
}
