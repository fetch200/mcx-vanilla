// 对话框
// 原生的对话框分三种：alert——消息提示、confirm——询问对话框、prompt——促使户输入内容的对话框
// 我们的组件有五种对话框：alert、confirm、prompt、showLoading、showToast、showModal

window.alert('222')
window.confirm('mmm')
window.prompt('344')

class DialogUtil {
  constructor() {
    this.unique = new Date().getTime()
    this.loadingNode = null
    this.loadingShowing = false
    this.toastNode = null
    this.toastShowing = false
    this.toastTimeId = null
    this.modalNode = null
    this.modalShowing = false
    this.modalDialogMaskEvent = false
  }

  createDialog(content) {
    return `
      <div class="mcx-dialog-mask">
        <div class="mcx-dialog-content">
          ${content}
        </div>
      </div>
    `
  }

  showLoading({title = '加载中'} = {title: '加载中'}) {
    if (!this.loadingNode) {
      this.loadingNode = document.createElement('div')
      this.loadingNode.className = 'loading_' + this.unique
    }
    this.loadingNode.innerHTML = this.createDialog(`
      <div class="mcx-loading">
        <svg class="mcx-loading-icon icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4146" width="200" height="200"><path d="M626.34496 121.8304c0 53.15072-43.07968 96.2304-96.2304 96.2304-53.1456 0-96.2304-43.07968-96.2304-96.2304C433.88928 68.67968 476.96896 25.6 530.11456 25.6c53.1456 0 96.2304 43.0848 96.2304 96.2304zM530.11456 833.9968c-46.50496 0-84.1984 37.69856-84.1984 84.1984s37.69856 84.1984 84.1984 84.1984 84.1984-37.69856 84.1984-84.1984-37.69344-84.1984-84.1984-84.1984z m398.18752-253.83936c-33.21856 0-60.14464-26.92096-60.14464-60.14464 0-33.21856 26.92608-60.14464 60.14464-60.14464 33.22368 0 60.14464 26.92608 60.14464 60.14464-0.00512 33.21856-26.9312 60.14464-60.14464 60.14464zM228.15744 520.0128c0-53.1456-43.07968-96.2304-96.2304-96.2304-53.1456 0-96.2304 43.07968-96.2304 96.2304 0 53.1456 43.07968 96.2304 96.2304 96.2304 53.15072 0 96.2304-43.0848 96.2304-96.2304z m88.448-349.59872c37.5808 37.5808 37.5808 98.5088 0 136.08448-37.5808 37.5808-98.5088 37.5808-136.0896 0s-37.5808-98.5088 0-136.0896 98.5088-37.5808 136.0896 0.00512z m444.03712 580.12672c-28.1856 28.1856-28.1856 73.8816-0.00512 102.0672 28.1856 28.1856 73.8816 28.1856 102.0672 0 28.1856-28.1856 28.1856-73.8816 0-102.0672-28.18048-28.19072-73.87648-28.19072-102.06208 0z m85.05856-478.06464c-18.7904 18.7904-49.25952 18.7904-68.03968 0-18.79552-18.79552-18.79552-49.25952 0-68.0448a48.09728 48.09728 0 0 1 68.03968 0c18.7904 18.7904 18.7904 49.25952 0 68.0448zM316.60544 733.52704c-37.5808-37.5808-98.5088-37.5808-136.0896 0s-37.5808 98.5088 0 136.08448c37.5808 37.5808 98.5088 37.5808 136.08448 0 37.5808-37.57568 37.5808-98.50368 0.00512-136.08448z" fill="#ffffff" p-id="4147"></path></svg>
        ${title ? `<div class="mcx-loading-title">${title}</div>` : ''}
      </div>
    `).trim()
    if (!this.loadingShowing) document.body.appendChild(this.loadingNode)
    this.loadingShowing = true
  }

  hideLoading() {
    this.loadingShowing && this.loadingNode && this.loadingNode.remove()
    this.loadingShowing = false
  }

  showToast({title, icon, duration = 1500} = {duration: 1500}) {
    if (!this.toastNode) {
      this.toastNode = document.createElement('div')
      this.toastNode.className = 'toast_' + this.unique
    }
    this.toastNode.innerHTML = this.createDialog(`
      <div class="mcx-toast">
        ${
      icon === 'success' ? '<svg class="mcx-toast-icon icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2198" width="64" height="64"><path d="M512 976.7424c-256.67072 0-464.7424-208.07168-464.7424-464.73728C47.2576 255.32928 255.32928 47.2576 512 47.2576s464.7424 208.07168 464.7424 464.7424c0 256.67072-208.07168 464.7424-464.7424 464.7424z m225.41312-754.26816c-161.65888 106.2144-264.18176 424.86272-264.18176 424.86272L410.14272 490.54208l-130.11968 101.16096c55.20896 25.28768 134.0672 106.2144 201.09312 212.4288 47.31392-111.26784 193.20832-338.87744 264.18176-359.11168-27.5968-80.9216-11.82208-146.67776-7.8848-222.54592z m0 0" fill="#FFFFFF" p-id="2199"></path></svg>'
        : icon === 'fail' ? '<svg class="mcx-toast-icon icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3165" width="64" height="64"><path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 394.016l-104-104q-12-12-27.488-12t-27.008 11.488-11.488 27.008 12 27.488l104 104-104 104q-12 12-12 27.488t11.488 27.008 27.008 11.488 27.488-12l104-104 104 104q16 15.008 36.992 9.504t26.496-26.496-9.504-36.992L565.984 512l104-104q12-12 12-27.488t-11.488-27.008-27.008-11.488-27.488 12z" p-id="3166" fill="#FFFFFF"></path></svg>'
        : icon === 'loading' ? '<svg class="mcx-toast-icon icon spin" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4146" width="200" height="200"><path d="M626.34496 121.8304c0 53.15072-43.07968 96.2304-96.2304 96.2304-53.1456 0-96.2304-43.07968-96.2304-96.2304C433.88928 68.67968 476.96896 25.6 530.11456 25.6c53.1456 0 96.2304 43.0848 96.2304 96.2304zM530.11456 833.9968c-46.50496 0-84.1984 37.69856-84.1984 84.1984s37.69856 84.1984 84.1984 84.1984 84.1984-37.69856 84.1984-84.1984-37.69344-84.1984-84.1984-84.1984z m398.18752-253.83936c-33.21856 0-60.14464-26.92096-60.14464-60.14464 0-33.21856 26.92608-60.14464 60.14464-60.14464 33.22368 0 60.14464 26.92608 60.14464 60.14464-0.00512 33.21856-26.9312 60.14464-60.14464 60.14464zM228.15744 520.0128c0-53.1456-43.07968-96.2304-96.2304-96.2304-53.1456 0-96.2304 43.07968-96.2304 96.2304 0 53.1456 43.07968 96.2304 96.2304 96.2304 53.15072 0 96.2304-43.0848 96.2304-96.2304z m88.448-349.59872c37.5808 37.5808 37.5808 98.5088 0 136.08448-37.5808 37.5808-98.5088 37.5808-136.0896 0s-37.5808-98.5088 0-136.0896 98.5088-37.5808 136.0896 0.00512z m444.03712 580.12672c-28.1856 28.1856-28.1856 73.8816-0.00512 102.0672 28.1856 28.1856 73.8816 28.1856 102.0672 0 28.1856-28.1856 28.1856-73.8816 0-102.0672-28.18048-28.19072-73.87648-28.19072-102.06208 0z m85.05856-478.06464c-18.7904 18.7904-49.25952 18.7904-68.03968 0-18.79552-18.79552-18.79552-49.25952 0-68.0448a48.09728 48.09728 0 0 1 68.03968 0c18.7904 18.7904 18.7904 49.25952 0 68.0448zM316.60544 733.52704c-37.5808-37.5808-98.5088-37.5808-136.0896 0s-37.5808 98.5088 0 136.08448c37.5808 37.5808 98.5088 37.5808 136.08448 0 37.5808-37.57568 37.5808-98.50368 0.00512-136.08448z" fill="#ffffff" p-id="4147"></path></svg>'
          : ''
    }
        ${title ? `<div class="mcx-toast-title" ${(!icon || ['success', 'fail', 'loading'].indexOf(icon) === -1) ? 'style="padding-top:0"' : ''}>${title}</div>` : ''}
      </div>
    `).trim()
    if (!this.toastShowing) document.body.appendChild(this.toastNode)
    this.toastShowing = true
    window.clearTimeout(this.toastTimeId)
    this.toastTimeId = setTimeout(() => {
      this.hideToast()
    }, duration)
  }

  hideToast() {
    this.toastShowing && this.toastNode && this.toastNode.remove()
    this.toastShowing = false
    this.toastTimeId && window.clearTimeout(this.toastTimeId)
    this.toastTimeId = null
  }

  showModal({content = '<div></div>'}) {
    if (!this.modalNode) {
      this.modalNode = document.createElement('div')
      this.modalNode.className = 'modal_' + this.unique
    }
    this.modalNode.innerHTML = this.createDialog(content).trim()
    document.body.appendChild(this.modalNode)
    if (!this.modalDialogMaskEvent) {
      const _this = this
      this.modalNode.querySelector('.mcx-dialog-mask').addEventListener('click', function (e) {
        if (this === e.target) _this.hideModal()
      })
    }
    this.modalShowing = true
  }

  hideModal() {
    this.modalShowing && this.modalNode && this.modalNode.remove()
    this.modalShowing = false
  }
}


export default new DialogUtil()