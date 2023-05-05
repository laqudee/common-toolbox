/**
 * @description 中国大陆手机号格式校验
 * @param {string} value 
 * @returns {boolean}
 */
export function isMobile(value) {
  if (!value) {
    return false
  }
  const reg = /^1[34578][0-9]\d{8}$/
  return reg.test(value)
}

/**
 * @description 邮箱格式校验
 * @param {string} value 
 * @returns {boolean}
 */
export function isEmail(value) {
  if (!value) {
    return false
  }
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  return reg.test(value)
}

/**
 * @description 中文姓名格式校验
 * @param {string} value 
 * @returns {boolean}
 */
export function isNameAsync(value) {
  if (!value) {
    return false
  }
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  return reg.test(value)
}
