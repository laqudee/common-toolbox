/**
 * @description 处理获取到的位置
 * @param {Object} position 
 * @returns {Promise<Object>}
 */
export const showPosition = (position) => {
  let lat = position.coords.latitude //纬度
  let lng = position.coords.longitude //经度
  return new Promise((resolve, reject) => {
    resolve({
      longitude: lng,
      latitude: lat
    })
  })
}

/**
 * @description 展示定位失败原因
 * @param {Object | Function} messageTool message通知工具，例如ElMessage；Toast；Alert； Message
 * @param {Error | Object} error 
 */
export const showError = (messageTool, error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      messageTool("定位失败,用户拒绝请求地理定位");
      break
    case error.POSITION_UNAVAILABLE:
      messageTool("定位失败,位置信息是不可用");
      break
    case error.TIMEOUT:
      messageTool("定位失败,请求获取用户位置超时");
      break
    case error.UNKNOWN_ERROR:
      messageTool("定位失败,定位系统失效");
      break
  }
}

/**
 * @description 通过浏览器提供的功能获取定位
 * @param {Object | Function} messageTool message通知工具，例如ElMessage；Toast；Alert； Message
 * @returns {Promise<Object>}
 */
export const getPositionByGeolocation = (messageTool) => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((res) => {

        showPosition(res).then((res) => {
          return res
        });
      })
      .catch((error) => {
        showError(messageTool, error)
      });
  } else {
    messageTool("不支持地理定位");
  }
}
