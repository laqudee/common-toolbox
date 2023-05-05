import JSEncrypt from 'jsencrypt'

/**
 * @description 生成加密函数的工厂函数
 * @param {string} publicKey 
 * @returns {Function}
 */
export function createEncrypter(publicKey) {
  try {
    if (!publicKey) throw new Error('`PUBLIC_KEY` 不能为空')
    return (content) => {
      let jse = new JSEncrypt()
      jse.setPublicKey(publicKey)
      // 加密内容
      let encrypted = jse.encrypt(content)
      return encrypted
    }
  } catch (e) {
    console.error(e)
  }
}
