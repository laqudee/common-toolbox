/**
 * @description 设置休眠时间
 * @param {number} timeout
 * @returns
 */
export async function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
