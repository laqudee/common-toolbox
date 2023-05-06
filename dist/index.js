'use strict';

var JSEncrypt = require('jsencrypt');
var html2Canvas = require('html2canvas');
var JsPDF = require('jspdf');
var dayjs = require('dayjs');
var promises = require('fs/promises');
var node_url = require('node:url');
var fs = require('node:fs');
var Cookies = require('js-cookie');

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
 * @description 设置休眠时间
 * @param {number} timeout
 * @returns
 */
async function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

/**
 * @description 获取数据类型
 * @param {any} value
 * @return "String","Object","Array"...
 */
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * @description 将指定div元素输出为pdf文件或者base64码
 * @param {string} ref div元素className
 * @param {string} type file:下载 base64:输出
 * @param {string} title
 * @returns {Promise<string> | void}
 */
function getPdf(ref, type, title) {
  return new Promise((resolve, reject) => {
    html2Canvas(document.querySelector(ref), {
      allowTaint: true,
      useCORS: true,
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      scale: 4 // 按比例增加分辨率
    }).then(function (canvas) {
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;
      let pageHeight = (contentWidth / 592.28) * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      let imgWidth = 595.28;
      let imgHeight = (592.28 / contentWidth) * contentHeight;
      let pageData = canvas.toDataURL('image/jpeg', 1.0);
      let PDF = new JsPDF('', 'pt', 'a4');
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            PDF.addPage();
          }
        }
      }
      if (type === 'file') {
        // 下载
        PDF.save(title + '.pdf');
      } else {
        // 输出pdf的base64码
        let pdfData = PDF.output('datauristring'); // 获取到base64码
        resolve(pdfData);
      }
    });
  })
}

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
 * @description 解绑事件 off(element, event, handler)
 * @returns
 */
const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    }
  }
})();

var common$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  off: off,
  on: on,
  setFontSize: setFontSize,
  settingFullscreen: settingFullscreen
});

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

var common$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getDateAndWeek: getDateAndWeek
});

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
    const folders = await promises.readdir(node_url.fileURLToPath(new node_url.URL(parentPath, (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href)))));
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

var nodeFileHandler = /*#__PURE__*/Object.freeze({
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

var index$1 = /*#__PURE__*/Object.freeze({
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
function isName(value) {
  if (!value) {
    return false
  }
  const reg = /^[\u4e00-\u9fa5]{2,4}$/;
  return reg.test(value)
}

/**
 * @description 是否是身份证
 * @param {string} value
 * @returns {boolean}
 */
function isIdCard(value) {
  if (!value) {
    return false
  }
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(value)
}

/**
 * @description 检查密码的复杂程度
 * @param {string} value
 * @param {Object | Function} messageTool 类似Toast；ElMessage；Message；Alert
 * @returns
 */
function passwordComplexityValidate(value, messageTool) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/;
  if (value === '') {
    messageTool('请输入密码');
    return false
  } else if (value.length > 16 || value.length < 8) {
    messageTool('密码长度必须在8-16之间');
    return false
  } else if (!reg.test(value)) {
    messageTool('密码必须包含大小写字母和数字的组合');
    return false
  } else {
    return true
  }
}

/**
 * @description 是否是数字
 * @param {any} value
 * @returns {boolean}
 */
function isNumeric(value) {
  return /^\d+(\.\d+)?$/.test(value)
}

/**
 * @description 是否是NaN
 * @param {any} value
 * @returns {boolean}
 */
function isNaN(value) {
  if (Number.isNaN) {
    return Number.isNaN(value)
  }

  return value !== value
}

/**
 * @description 是否是日期
 * @param {Date} value
 * @returns {boolean}
 */
function isDate(value) {
  return getType(value) === 'Date' && !isNaN(value.getTime())
}

/**
 * @description 是否是浏览器
 * @returns {boolean}
 */
const inBrowser = typeof window !== 'undefined';

/**
 * @description 是否是安卓
 * @returns {boolean}
 */
function isAndroid() {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false
}

/**
 * @description 是否是IOS
 * @returns {boolean}
 */
function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  inBrowser: inBrowser,
  isAndroid: isAndroid,
  isDate: isDate,
  isEmail: isEmail,
  isIOS: isIOS,
  isIdCard: isIdCard,
  isMobile: isMobile,
  isNaN: isNaN,
  isName: isName,
  isNumeric: isNumeric,
  passwordComplexityValidate: passwordComplexityValidate
});

/**
 * @description 处理获取到的位置
 * @param {Object} position
 * @returns {Promise<Object>}
 */
const showPosition = (position) => {
  let lat = position.coords.latitude; //纬度
  let lng = position.coords.longitude; //经度
  return new Promise((resolve, reject) => {
    resolve({
      longitude: lng,
      latitude: lat
    });
  })
};

/**
 * @description 展示定位失败原因
 * @param {Object | Function} messageTool message通知工具，例如ElMessage；Toast；Alert； Message
 * @param {Error | Object} error
 */
const showError = (messageTool, error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      messageTool('定位失败,用户拒绝请求地理定位');
      break
    case error.POSITION_UNAVAILABLE:
      messageTool('定位失败,位置信息是不可用');
      break
    case error.TIMEOUT:
      messageTool('定位失败,请求获取用户位置超时');
      break
    case error.UNKNOWN_ERROR:
      messageTool('定位失败,定位系统失效');
      break
  }
};

/**
 * @description 通过浏览器提供的功能获取定位
 * @param {Object | Function} messageTool message通知工具，例如ElMessage；Toast；Alert； Message
 * @returns {Promise<Object>}
 */
const getPositionByGeolocation = (messageTool) => {
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
        showError(messageTool, error);
      })
  } else {
    messageTool('不支持地理定位');
  }
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPositionByGeolocation: getPositionByGeolocation
});

exports.browserHandler = index;
exports.cookieAndStorage = index$1;
exports.createEncrypter = createEncrypter;
exports.dateHandler = common$2;
exports.domHandler = common$3;
exports.fileHandler = common$1;
exports.getPdf = getPdf;
exports.getType = getType;
exports.nodeFileHandler = nodeFileHandler;
exports.sleep = sleep;
exports.validator = common;
