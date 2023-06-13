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

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 设置全屏与关闭全屏
 */
export const settingFullscreen = () => {
  // 判断是否全屏，全屏则退出，非全屏则全屏
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msCancelFullScreen) {
      document.msCancelFullScreen()
    }
  } else {
    document
      .querySelector('html')
      .requestFullscreen()
      .then(() => {
        // 进入全屏成功
      })
      .catch(() => {
        // 进入全屏失败
      })
  }
}
