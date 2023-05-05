import JSEncrypt from 'jsencrypt';
import dayjs from 'dayjs';
import { readdir } from 'fs/promises';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import Cookies from 'js-cookie';

/**
 * @description 生成加密函数的工厂函数
 * @param {string} publicKey
 * @returns {Function}
 */
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
 * @returns {Object}
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

/**
 * @description 以1920底图为基准开发页面
 * @returns
 */
const setFontSize = () => {
  window.useRem = true;
  const baseSize = 16
  ;(function (doc, win) {
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
 * @returns
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
 * @returns
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
 * @returns {File}
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
 * @description 下载指定格式与名称的文件
 * @param {*} url
 * @param {*} name
 * @param {*} type
 * @returns
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

var common$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  blobFile: blobFile,
  dataURLtoFile: dataURLtoFile
});

/**
 * @description 判断文件是否存在
 * @param {string | path} path
 * @returns {boolean}
 */
const isFileExist = (path) => {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
};

/**
 * @description 获取parentPath下的除了excludeRegex正则表达式包含的目录
 * @param {string} parentPath
 * @param {RegExp} excludeRegex
 * @returns {Promise<string[]>}
 */
const getFolderExcludeSome = async (parentPath, excludeRegex) => {
  try {
    const folders = await readdir(fileURLToPath(new URL(parentPath, import.meta.url)));
    let resultFolders = [];
    folders.forEach((folder) => {
      if (!excludeRegex.test(folder)) {
        resultFolders.push(folder);
      }
    });
    return resultFolders
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description 判断参数name的目录是否存在
 * @param {string} parentPath
 * @param {RegExp} excludeRegex
 * @param {string} name
 * @returns {boolean}
 */
const hasFolder = async (parentPath, excludeRegex, name) => {
  let projectList = [];
  if (projectList.length === 0) {
    projectList = await getFolderExcludeSome(parentPath, excludeRegex);
  }
  if (projectList.includes(name)) return true
  return false
};

var nodeFsHandler = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getFolderExcludeSome: getFolderExcludeSome,
  hasFolder: hasFolder,
  isFileExist: isFileExist
});

/**
 * @description 获取localStorage中键名为key的值
 * @param {string} key
 * @returns {object | undefined}
 */
function getLocalStorage(key) {
  return localStorage.getItem(key)
}

/**
 * @description 通过参数key向localStorage中存储为键名为key的值
 * @param {string} key
 * @param {string | object} value
 */
function setLocalStorage(key, value) {
  if (value && typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

/**
 * @description 通过参数key从localStorage中删除键名为key的值
 * @param {string} key
 */
function removeLocalStorage(key) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
}

/**
 * @description 清除localStorage
 */
function clearAllLocalStorage() {
  localStorage.clear();
}

const config = {
  cookieExpires: 7
};

/**
 * @description 通过参数key获取名为key的cookie值
 * @param {string} key
 * @returns {string | undefined}
 */
function getCookie(key) {
  if (Cookies.get(key)) {
    return Cookies.get(key)
  } else {
    return ''
  }
}

/**
 * @description 通过参数key设置名为key的cookie值, 并设置cookie过期时间
 * @param {string} key
 * @param {string} value
 * @param {number} expires
 */
function setCookie(key, value, expires) {
  Cookies.set(key, value, { expires: expires || config.cookieExpires });
}

/**
 * @description 通过参数key删除名为key的cookie
 * @param {string} key
 */
function removeCookie(key) {
  if (Cookies.get(key)) {
    Cookies.remove(key);
  }
}

/**
 * @description 清除所有cookie
 */
function clearAllCookies() {
  const cookies = Cookies.get();
  for (let key in cookies) {
    Cookies.remove(key);
  }
}

/**
 * @description 清除所有localStorage 和 cookies
 */
function clearAllStorage() {
  clearAllCookies();
  clearAllLocalStorage();
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clearAllCookies: clearAllCookies,
  clearAllLocalStorage: clearAllLocalStorage,
  clearAllStorage: clearAllStorage,
  getCookie: getCookie,
  getLocalStorage: getLocalStorage,
  removeCookie: removeCookie,
  removeLocalStorage: removeLocalStorage,
  setCookie: setCookie,
  setLocalStorage: setLocalStorage
});

/**
 * @description 中国大陆手机号格式校验
 * @param {string} value
 * @returns {boolean}
 */
function isMobile(value) {
  if (!value) {
    return false
  }
  const reg = /^1[34578][0-9]\d{8}$/;
  return reg.test(value)
}

/**
 * @description 邮箱格式校验
 * @param {string} value
 * @returns {boolean}
 */
function isEmail(value) {
  if (!value) {
    return false
  }
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  return reg.test(value)
}

/**
 * @description 中文姓名格式校验
 * @param {string} value
 * @returns {boolean}
 */
function isNameAsync(value) {
  if (!value) {
    return false
  }
  const reg = /^[\u4e00-\u9fa5]{2,4}$/;
  return reg.test(value)
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isEmail: isEmail,
  isMobile: isMobile,
  isNameAsync: isNameAsync
});

export { index as cookieAndStorage, createEncrypter, common$1 as fileHandler, getDateAndWeek, nodeFsHandler as nodeFileHandler, on, setFontSize, settingFullscreen, common as validator };
