/**
 * @description 使用*加密文本
 * @param {string} text
 * @param {string} flag name | mobile | email
 * @param {string} tipText 如果text的值为空或者null，将展示tipText的值
 * @returns {string}
 */
export function encryptText(text, flag, tipText) {
  let result = ''
  if (flag === 'name') {
    result = encryptName(text, tipText)
  }
  if (flag === 'mobile') {
    result = encryptMobile(text, tipText)
  }
  if (flag === 'email') {
    result = encryptEmail(text, tipText)
  }

  return result
}

/**
 * @description 使用*加密中文姓名
 * @param {string} name
 * @param {string} tipText
 * @returns {string}
 */
export function encryptName(name, tipText) {
  if (!name || name == null) {
    return tipText || '**'
  } else {
    let last = name.slice(1)
    return `*${last}`
  }
}

/**
 * @description 使用*加密手机号
 * @param {string} mobile
 * @param {string} tipText
 * @returns {string}
 */
export function encryptMobile(mobile, tipText) {
  if (!mobile || mobile == null) {
    return tipText || '暂未绑定手机号'
  } else {
    let first = mobile.slice(0, 3)
    let last = mobile.slice(7)
    return `${first}****${last}`
  }
}

/**
 * @description 使用*加密email
 * @param {string} email
 * @param {string} tipText
 * @returns {string}
 */
export function encryptEmail(email, tipText) {
  if (!email || email == null) {
    return tipText || '暂未绑定邮箱'
  } else {
    const array = email.split('@')
    if (array[0].length < 3) {
      return `${array[0]}***@${array[1]}`
    } else {
      const first = email.slice(0, 3)
      return `${first}***@${array[1]}`
    }
  }
}
