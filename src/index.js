import { createAxios } from './axios/common.js'
import { createEncrypter } from './encrypt/index.js'
import { sleep, getType, on, settingFullscreen } from './tools/common.js'
import { getPdf } from './files/htmlToPdf.js'
import * as encryptHandler from './encrypt/index.js'
import * as domHandler from './dom/common.js'
import * as dateHandler from './date/common.js'
import * as fileHandler from './files/common.js'
// import * as nodeFileHandler from './files/nodeFileHandler.js'
import * as cookieAndStorage from './cookie/index.js'
import * as validator from './validator/common.js'
import * as browserHandler from './browser/index.js'

export {
  createAxios,
  createEncrypter,
  sleep,
  getType,
  getPdf,
  on,
  settingFullscreen,
  encryptHandler,
  domHandler,
  dateHandler,
  fileHandler,
  // nodeFileHandler, // TODO some thing error
  validator,
  cookieAndStorage,
  browserHandler
}
