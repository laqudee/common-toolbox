import { getType } from '../tools/common.js'

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
export function isName(value) {
  if (!value) {
    return false
  }
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  return reg.test(value)
}

/**
 * @description 是否是身份证
 * @param {string} value
 * @returns {boolean}
 */
export function isIdCard(value) {
  if (!value) {
    return false
  }
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(value)
}

/**
 * @description 检查密码的复杂程度
 * @param {string} value
 * @param {Object | Function} messageTool 类似Toast；ElMessage；Message；Alert
 * @returns
 */
export function passwordComplexityValidate(value, messageTool) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/
  if (value === '') {
    messageTool('请输入密码')
    return false
  } else if (value.length > 16 || value.length < 8) {
    messageTool('密码长度必须在8-16之间')
    return false
  } else if (!reg.test(value)) {
    messageTool('密码必须包含大小写字母和数字的组合')
    return false
  } else {
    return true
  }
}

/**
 * @description 是否是数字
 * @param {any} val
 * @returns {boolean}
 */
export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val)
}

/**
 * @description 是否是NaN
 * @param {any} val
 * @returns {boolean}
 */
export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val)
  }

  return val !== val
}

/**
 * @description 是否是日期
 * @param {Date} val
 * @returns {boolean}
 */
export function isDate(val) {
  return getType(val) === 'Date' && !isNaN(val.getTime())
}

/**
 * @description 是否是浏览器
 * @returns {boolean}
 */
export const inBrowser = typeof window !== 'undefined'

/**
 * @description 是否是安卓
 * @returns {boolean}
 */
export function isAndroid() {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false
}

/**
 * @description 是否是IOS
 * @returns {boolean}
 */
export function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false
}
