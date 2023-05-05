import { createEncrypter } from './encrypt/common.js'
import { getDateAndWeek } from './date/common.js'
import { setFontSize, settingFullscreen, on } from './dom/common.js'
import { dataURLtoFile, blobFile } from './files/common.js'
import * as cookieAndStorage from './cookie/index.js'
import * as validator from './validator/common.js'

export {
  createEncrypter,
  getDateAndWeek,
  setFontSize,
  settingFullscreen,
  on,
  dataURLtoFile,
  blobFile,
  validator,
  cookieAndStorage
}
