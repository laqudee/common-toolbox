import { createEncrypter } from './encrypt/common.js'
import { getDateAndWeek } from './date/common.js'
import * as validator from './validator/common.js'
import { setFontSize, settingFullscreen, on } from './dom/common.js'
import { dataURLtoFile, blobFile } from './files/common.js'

export {
  createEncrypter,
  getDateAndWeek,
  setFontSize,
  settingFullscreen,
  on,
  dataURLtoFile,
  blobFile,
  validator,
}
