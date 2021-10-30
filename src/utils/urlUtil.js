class UrlUtil {
  // 解析 url 的 query 参数
  parseUrlQuery(url = window.location.href) {
    const qIndex = url.indexOf('?')
    if (qIndex === -1) return {}
    const hIndex = url.indexOf('#')
    const matchString = hIndex === -1 ? url.slice(qIndex + 1) : url.slice(qIndex + 1, hIndex)
    let obj = {}
    matchString.split('&').forEach(item => {
      if (!item) return
      const index = item.indexOf('=')
      if (index === -1) {
        const key = window.decodeURIComponent(item)
        obj[key] = ''
        return
      }
      const key = window.decodeURIComponent(item.slice(0, index))
      obj[key] = window.decodeURIComponent(item.slice(index + 1))
    })
    return obj
  }

  // 调整 url 的 query 参数然后返回 url
  encodeUrlQuery(obj, url = window.location.href) {
    const originObj = this.parseUrlQuery(url)
    const hIndex = url.indexOf('#')
    let fullHostString = ''
    for (let i = 0; i < url.length; i++) {
      if (url[i] === '?' || url[i] === '#') {
        break
      }
      fullHostString += url[i]
    }
    let hashString = hIndex === -1 ? '' : url.slice(hIndex)
    Object.keys(obj).forEach(item => {
      originObj[item] = obj[item]
    })
    let queryString = ''
    Object.keys(originObj).forEach(item => {
      queryString += '&' + window.encodeURIComponent(item) + '=' + window.encodeURIComponent(originObj[item])
    })
    if (queryString) queryString = '?' + queryString.slice(1)
    return fullHostString + queryString + hashString
  }
}

const urlUtil = new UrlUtil()

export default urlUtil