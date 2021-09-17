// 网络请求

class RequestUtil {
  // fetch API 用法详看 MDN，携带 cookie 需在 options 中添加 credentials: 'include'
  constructor() {
    ['get', 'post', 'put', 'delete'].forEach(item => {
      this[item] = (url, option = {}) => {
        return fetch(url, {method: item, ...option})
      }
    })
  }
}

const requestUtil = new RequestUtil()

export {requestUtil}