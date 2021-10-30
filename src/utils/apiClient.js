// 自定义 API Client
/**
 * 简介
 * 简单封装了一下 get 和 post 请求
 * apiClient 内部需要设置：主机地址，基础 options(例如设置 cookie 的携带策略)
 *
 * get 方法接受两个参数，path:String, options:Object
 * options 的属性可选：baseUrl?=baseUrl:String, withToken?=withToken:Boolean
 *
 * post 方法接受三个参数，path:String, data:Object, options:Object
 * options 的属性可选: baseUrl?=baseUrl:String, withToken?=withToken:Boolean type?=json |formUrlencoded | formData
 */

import urlUtil from './urlUtil'

class ApiClient {
  constructor() {
    this.endPoints = {
      dev: 'https://api.github.com',
      prod: 'https://api.github.com'
    }
    this.baseUrl = this.endPoints.prod
    this.baseOptions = {
      // credentials: 'include'
    }
    this.contentTypeObject = {
      formData: '',
      formUrlEncoded: 'application/x-www-form-urlencoded',
      json: 'application/json',
    }
  }

  get(path, options) {
    const baseUrl = (options && options.baseUrl) || this.baseUrl
    let url = baseUrl + path
    if(options && options.withToken){
      const queryObject = urlUtil.parseUrlQuery()
      if(queryObject.token){
        url = urlUtil.encodeUrlQuery({token:queryObject.token},url)
      }
    }
    return fetch(url, {
      ...this.baseOptions
    }).then(res => res.ok ? res.json() : Promise.reject('接口出错'))
      .catch(e=>void 0)
  }

  post(path, data, options) {
    let contentType = this.contentTypeObject.json
    const baseUrl = (options && options.baseUrl) || this.baseUrl
    let convertedData = JSON.stringify(data)
    if (options && options.type) {
      if (options.type === 'formUrlencoded') {
        contentType = this.contentTypeObject.formUrlEncoded
        convertedData = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
      } else if (options.type === 'formData') {
        contentType = this.contentTypeObject.formData
        convertedData = new FormData()
        Object.keys(data).forEach(key => convertedData.append(key, data[key]))
      }
    }
    const headers = {}
    if(contentType){
      headers['content-type'] = contentType
    }

    let url = baseUrl + path
    if(options && options.withToken){
      const queryObject = urlUtil.parseUrlQuery()
      if(queryObject.token){
        url = urlUtil.encodeUrlQuery({token:queryObject.token},url)
      }
    }
    return fetch(url, {
      ...this.baseOptions,
      method: 'post',
      headers,
      body: convertedData
    }).then(res => res.ok ? res.json() : Promise.reject('接口错误'))
      .catch(e=>void 0)
  }
}

const apiClient = new ApiClient()

export default apiClient