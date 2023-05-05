/**
 * @description 设置休眠时间
 * @param {number} timeout
 * @returns
 */
export async function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

/**
 * @description 获取数据类型
 * @param {any} value
 * @return "String","Object","Array"...
 */
export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
