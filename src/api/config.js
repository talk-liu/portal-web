import axios from 'axios'
import qs from 'qs'
import { EventEmitter } from 'events'
import Promise from 'core-js/es6/promise'
import Includes from 'core-js/fn/array/includes'
import Cookies from '@/utils/cookies'
import config from '@/config'

const axiosInstance = axios.create()
if (!Array.prototype.includes) {
  Array.prototype.includes = function(el, fromIndex) {
    return Includes(this, el, fromIndex)
  }
}
if (!window.Promise) {
  window.Promise = Promise
}
const eventHub = new EventEmitter()

let csrfToken = Cookies.getCookie('csrfToken') || ''
axiosInstance.defaults.headers.common['X-CSRF-Token'] = process.env.NODE_ENV !== 'production' ? config.csrfToken : csrfToken,
/**
 * 序列化数组参数
 */
axiosInstance.defaults.paramsSerializer = params => {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
  async config => {
    eventHub.emit('request', config)
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
  response => {
    eventHub.emit('response', response)
    return response
  },
  error => {
    eventHub.emit('response', error)
    return Promise.reject(error)
  },
)

export const hub = eventHub
export const axiosInstanceVar = axiosInstance

/**
 * post请求
 * @param {*} url 请求url
 * @param {*} params 请求参数
 */
export function post(url, params) {
  return axiosInstance
    .post(url, params)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

/**
 * get请求
 * @param {*} url 请求url
 * @param {*} params 请求参数
 */
export function get(url, params) {
  return axiosInstance
    .get(url, { params })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
