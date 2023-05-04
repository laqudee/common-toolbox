'use strict';

var JSEncrypt = require('jsencrypt');
var dayjs = require('dayjs');

function createEncrypter(publicKey) {
  try {
    if (!publicKey) throw new Error('`PUBLIC_KEY` 不能为空')
    return (content) => {
      let jse = new JSEncrypt();
      jse.setPublicKey(publicKey);
      // 加密内容
      let encrypted = jse.encrypt(content);
      return encrypted
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * @description 获取当前日期、星期数
 */
const getDateAndWeek = () => {
  const date = new Date();
  const year = dayjs(date).format('YYYY年M月D日');
  const time = dayjs(date).format('HH:mm');
  const week = date.getDay();

  const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  return {
    date: year,
    week: weekList[week],
    time: time
  }
};

function isMobile(rule, value) {
  if (!rule.required && !value) {
    return true
  }
  const reg = /^1[34578][0-9]\d{8}$/;
  return reg.test(value)
}

function isMobileAsync(rule, value, callback) {
  const reg = /^1[34578][0-9]\d{8}$/;
  const msg = '您输入的手机号不合法，请重新输入';

  if (!rule.required && !value) callback();
  const valid = reg.test(value);
  if (valid) callback();
  callback(new Error(rule.message || msg));
}

function isEmail(rule, value) {
  if (!rule.required && !value) {
    return true
  }
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  return reg.test(value)
}

function isEmailAsync(rule, value, callback) {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.([a-zA-Z0-9_-]+)/;
  const msg = '您输入的邮箱地址不正确，请重新输入';

  if (!rule.required && !value) callback();
  const match = value.match(reg);
  const valid = match && match[1].length > 1;
  if (valid) callback();
  callback(new Error(rule.message || msg));
}

// 姓名中文校验
function isNameAsync(rule, value, callback) {
  if (!rule.required && !value) {
    callback();
  }
  let reg = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!reg.test(value)) {
    callback(new Error('姓名不合法，请重新输入'));
  }
  callback();
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isEmail: isEmail,
  isEmailAsync: isEmailAsync,
  isMobile: isMobile,
  isMobileAsync: isMobileAsync,
  isNameAsync: isNameAsync
});

/**
 * @description 以1920底图为基准开发页面
 */
const setFontSize = () => {
  window.useRem = true;
  const baseSize = 16
    ; (function (doc, win) {
      setRem();
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          setRem();
        };
      if (!doc.addEventListener) return
      win.addEventListener(resizeEvt, recalc, false);
    })(document, window);

  function setRem() {
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改
    // const scale = document.documentElement.clientHeight / 1080;
    const scale = document.documentElement.clientWidth / 1920;
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 5) + 'px';
  }
};

/**
 * @description 设置全屏与关闭全屏
 */
const settingFullscreen = () => {
  // 判断是否全屏，全屏则退出，非全屏则全屏
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msCancelFullScreen) {
      document.msCancelFullScreen();
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
      });
  }
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    }
  }
})();

/**
 * @description 将base64转换为文件,接收2个参数，第一是base64，第二个是文件名字
 * @param {*} dataurl
 * @param {*} filename
 * @returns 文件对象
 */
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  })
}

/**
 *
 * @param {*} url
 * @param {*} name
 * @param {*} type
 */
const blobFile = (url, name, type) => {
  let blob = new Blob([url], {
    type: type
  });
  let downloadElement = document.createElement('a');
  let href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

exports.blobFile = blobFile;
exports.createEncrypter = createEncrypter;
exports.dataURLtoFile = dataURLtoFile;
exports.getDateAndWeek = getDateAndWeek;
exports.on = on;
exports.setFontSize = setFontSize;
exports.settingFullscreen = settingFullscreen;
exports.validator = common;
