// 网络

const unique = new Date().getTime()

class Request {
  // fetch API 用法详看 MDN，携带 cookie 需在 options 中添加 credentials: 'include'
  constructor() {
    ['get','post','put','delete'].forEach(item=>{
      this[item] = (url,option={})=>{
        return fetch(url,{method:item,...option})
      }
    })
  }
}

class NetworkFile {
  constructor() {
    this.node = document.createElement('input')
    this.node.className = 'upload-input-' + unique
    this.node.type = 'file'
    this.node.style.display = 'none'
  }

  upload() {
    document.body.appendChild(this.node)
  }

  download() {

  }
}

const network = {
  // 发起请求
  request: new Request(),
  // 文件的上传下载有空了可以研究一下
  // networkFile: new NetworkFile(),
  // websocket 以后可以研究一下
}

export {network}