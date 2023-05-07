/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import axios from 'axios'
import { stringify } from 'qs'

// TODO 错误提示不完善

/**
 * @descriptor 需要校验options中的选项
 * @param {string} baseURL
 * @param {number} timeout
 * @param {string} tokenName
 * @param {string} token
 * @param {function} getToken
 * @param {RouterType} router
 * @param {Message | ElMessage} messageTip
 */
let router
let messageTip
export function createAxios(options = {}) {
  router = options.router
  messageTip = options.messageTip

  const instance = axios.create({
    baseURL: options.baseURL || '',
    timeout: options.timeout || 60000
  })

  instance.interceptors.request.use((config) => {
    const token = options.getToken()

    if (token && options.tokenName) {
      config.headers[options.tokenName] = token
    }

    if (
      config.headers['content-type'] === 'application/x-www-form-urlencoded' ||
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      if (config.needFormat) {
        config.data = stringify(config.data, { arrayFormat: 'indices', allowDots: true })
        delete config.needFormat
      } else {
        config.data = stringify(config.data)
      }
    }
    return config
  })

  return {
    async post(url, data, config) {
      try {
        const response = await instance({
          method: 'post',
          url,
          data: checkParam(data),
          headers: config && config.headers ? config.headers : {},
          needFormat: config && config.needFormat ? config.needFormat : false
        })
        const res = await checkStatus(response)
        return checkCode(res)
      } catch (res_1) {
        return catchError(res_1, options)
      }
    },
    async delete(url, data) {
      try {
        const response = await instance({
          method: 'delete',
          url,
          data: checkParam(data)
        })
        const res = await checkStatus(response)
        return checkCode(res)
      } catch (res_1) {
        return catchError(res_1, options)
      }
    },
    async put(url, data) {
      try {
        const response = await instance({
          method: 'put',
          url,
          data: checkParam(data)
        })
        const res = await checkStatus(response)
        return checkCode(res)
      } catch (res_1) {
        return catchError(res_1, options)
      }
    },
    async get(url, params, config) {
      try {
        const response = await instance({
          method: 'get',
          url,
          params: checkParam(params),
          headers: config && config.headers ? config.headers : {},
          responseType: config && config.responseType ? config.responseType : ''
        })
        const res = await checkStatus(response)
        return checkCode(res)
      } catch (res_1) {
        return catchError(res_1, options)
      }
    },
    async download(url, params, method = 'get', headers, cancel) {
      // data: 请求参数
      if (method === 'get' && params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
          if (Array.isArray(params[key])) {
            params[key] = params[key].join(',')
          }
        })
      }
      try {
        const res = await instance({
          url,
          method,
          params: method === 'get' ? params : null,
          data: method === 'post' ? params : null,
          responseType: 'blob',
          timeout: 60000,
          headers
        })
        const { headers: headers_2, data } = res
        const { 'content-type': contentType, 'content-disposition': disposition } = headers_2
        if (data instanceof Blob) {
          const decodePosition = decodeURIComponent(disposition).toLocaleLowerCase()
          // 过滤Firefox浏览器错误文件名
          const replacedPosit = decodePosition
            .replace(/"/g, '')
            .replace(/\*/g, '')
            .replace(/zh_cn/g, '')
            .replace(/utf-8/g, '')
            .replace(/'/g, '')
          let nameFromHeader = ''
          const idx = replacedPosit.indexOf('filename=')
          if (replacedPosit && idx) {
            // 提取响应头content-disposition中的filename
            nameFromHeader = replacedPosit.slice(idx, replacedPosit.length).replace('filename=', '')
          }
          const fileName = nameFromHeader || 'export-information.xls'
          const blob = new Blob([data], { type: contentType })
          if (contentType === 'application/json;charset=UTF-8') {
            const blobReader = new Response(blob).json()
            blobReader.then((res_2) => {
              const message = res_2.errmsg || res_2.msg || res_2.message
              messageTip({
                message: message,
                type: 'error'
              })
            })
          } else {
            if ('download' in document.createElement('a')) {
              // 非IE下载
              const elink = document.createElement('a')
              elink.download = fileName
              elink.style.display = 'none'
              elink.href = URL.createObjectURL(blob)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
            } else if (window.navigator.msSaveBlob) {
              // IE10+中文件下载方法
              window.navigator.msSaveBlob(blob, fileName)
            }
          }
        }
      } catch (res_3) {
        return checkCode(res_3)
      }
    },
    async saveLoad(url, params, method = 'get', headers, cancel) {
      // data: 请求参数
      if (method === 'get' && params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
          if (Array.isArray(params[key])) {
            params[key] = params[key].join(',')
          }
        })
      }
      return instance({
        url,
        method,
        params: method === 'get' ? params : null,
        data: method === 'post' ? params : null,
        responseType: 'blob',
        timeout: 60000,
        headers
      })
        .then((res) => {
          const { headers, data } = res
          const { 'content-type': contentType, 'content-disposition': disposition } = headers
          if (data instanceof Blob) {
            const blob = new Blob([data], { type: contentType })
            if (contentType === 'application/json;charset=UTF-8') {
              const blobReader = new Response(blob).json()
              blobReader.then((res) => {
                const message = res.errmsg || res.msg || res.message
                messageTip({
                  message: message,
                  type: 'error'
                })
              })
            } else {
              return URL.createObjectURL(blob)
            }
          }
        })
        .catch((res) => {
          return checkCode(res)
        })
    },
    async getBlob(url, params) {
      return instance({
        url,
        method: 'get',
        params: params,
        responseType: 'blob',
        timeout: 60000
      })
        .then((res) => {
          const { headers, data } = res
          const { 'content-type': contentType, 'content-disposition': disposition } = headers
          if (data instanceof Blob) {
            const blob = new Blob([data], { type: contentType })
            if (contentType === 'application/json;charset=UTF-8') {
              const blobReader = new Response(blob).json()
              blobReader.then((res) => {
                const message = res.errmsg || res.msg || res.message
                messageTip({
                  message: message,
                  type: 'error'
                })
              })
            } else {
              return URL.createObjectURL(blob)
            }
          }
        })
        .catch((res) => {
          return checkCode(res)
        })
    }
  }
}

const checkStatus = (response) => {
  const successStatus = [200, 304, 400]
  if (response && successStatus.includes(response.status)) {
    return response.data
  }
  return new Error('service status error')
}

function checkCode(res) {
  if (res && res.code === 401) {
    messageTip({
      message: res.message || 'Login has expired, please log in again.',
      type: 'warning'
    })
    if (router.currentRoute.path !== '/login') {
      router.replace('/login')
    }
  } else {
    if (res.type && res.type === 'application/vnd.ms-excel') {
      return {
        success: true,
        data: res
      }
    }
    const message = res.errmsg || res.msg || res.message
    if (res.code !== 0 && res.code !== 200) {
      if (/[\u4e00-\u9fa5]/.test(message) && message.length < 100) {
        messageTip({
          message: message,
          type: 'warning',
          customClass: 'mes_index'
        })
      } else {
        messageTip({ message: 'Web Service Error', type: 'error' })
      }
    }
  }
  return res
}

function catchError(res, options) {
  const error = [
    // 'Request failed with status code 403',
    'Request failed with status code 401'
  ]
  const message = res.errmsg || res.msg || res.message
  if (error.includes(message)) {
    router.replace('/login')
  }
}

const checkParam = (data) => {
  const type = Object.prototype.toString.call(data)
  if (type === '[object Object]') {
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null || data[key] === '') {
        delete data[key]
      }
      if (Object.prototype.toString.call(data[key]) === '[object String]') {
        data[key] = data[key].trim()
      }
    })
  }
  return data
}
