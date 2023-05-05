import { createEncrypter } from './encrypt/common.js'
import { getDateAndWeek } from './date/common.js'
import { setFontSize, settingFullscreen, on } from './dom/common.js'
import fileHandler from './files/common.js'
import * as nodeFileHandler from './files/node-fs-handler.js'
import * as cookieAndStorage from './cookie/index.js'
import * as validator from './validator/common.js'

export {
  createEncrypter,
  getDateAndWeek,
  setFontSize,
  settingFullscreen,
  on,
  fileHandler,
  nodeFileHandler,
  validator,
  cookieAndStorage
}
