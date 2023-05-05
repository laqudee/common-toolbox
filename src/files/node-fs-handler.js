import { readdir } from 'fs/promises'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

/**
 * @description 判断文件是否存在
 * @param {string | path} path
 * @returns {boolean}
 */
export const isFileExist = (path) => {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}

/**
 * @description 获取parentPath下的除了excludeRegex正则表达式包含的目录
 * @param {string} parentPath
 * @param {RegExp} excludeRegex
 * @returns {Promise<string[]>}
 */
export const getFolderExcludeSome = async (parentPath, excludeRegex) => {
  try {
    const folders = await readdir(fileURLToPath(new URL(parentPath, import.meta.url)))
    let resultFolders = []
    folders.forEach((folder) => {
      if (!excludeRegex.test(folder)) {
        resultFolders.push(folder)
      }
    })
    return resultFolders
  } catch (e) {
    console.error(e)
  }
}

/**
 * @description 判断参数name的目录是否存在
 * @param {string} parentPath
 * @param {RegExp} excludeRegex
 * @param {string} name
 * @returns {boolean}
 */
export const hasFolder = async (parentPath, excludeRegex, name) => {
  let projectList = []
  if (projectList.length === 0) {
    projectList = await getFolderExcludeSome(parentPath, excludeRegex)
  }
  if (projectList.includes(name)) return true
  return false
}
