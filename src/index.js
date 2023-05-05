import { createEncrypter } from './encrypt/common.js'
import { getDateAndWeek } from './date/common.js'
import { setFontSize, settingFullscreen, on, off } from './dom/common.js'
import { sleep, getType } from './tools/common.js'
import { getPdf } from './files/htmlToPdf.js'
import * as fileHandler from './files/common.js'
import * as nodeFileHandler from './files/nodeFileHandler.js'
import * as cookieAndStorage from './cookie/index.js'
import * as validator from './validator/common.js'
import * as browserHandler from './browser/index.js'

export {
  createEncrypter,
  getDateAndWeek,
  setFontSize,
  settingFullscreen,
  on,
  off,
  sleep,
  getType,
  getPdf,
  fileHandler,
  nodeFileHandler,
  validator,
  cookieAndStorage,
  browserHandler
}
