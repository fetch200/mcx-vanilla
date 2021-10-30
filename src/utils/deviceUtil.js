// 设备、终端

class DeviceUtil {
  constructor() {
    console.log('deviceUtil')
  }

  getSystemInfo() {}

  setClipboardData() {}

  getClipboardData() {}
}

/**
 * 浏览器检查：方法一
 * 判断终端
 * @type {{versions: {iPhone: boolean, webApp: boolean, qq: boolean, trident: boolean, gecko: boolean, weixin: boolean, android: boolean, mobile: boolean, iPad: boolean, ios: boolean, presto: boolean, webKit: boolean}, language: string}}
 */
const browser={
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //iOS终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //Android终端
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
/**
 * 使用方法
 */
// 判断是否IE内核
if (browser.versions.trident) {
  alert('is IE')
}
//判断是否webKit内核
if (browser.versions.webKit) {
  alert('is webKit')
}
//判断是否移动端
if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
  alert('移动端')
}
/**
 * 检测浏览器语言
 * @type {string}
 */
let currentLang = navigator.language   //判断除IE外其他浏览器使用语言
if (!currentLang) {//判断IE浏览器使用语言
  currentLang = navigator.browserLanguage
}
alert(currentLang)

/**
 * 浏览器检查：方法二
 */
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  //alert(navigator.userAgent);
  window.location.href = 'iPhone.html'
} else if (/(Android)/i.test(navigator.userAgent)) {
  //alert(navigator.userAgent);
  window.location.href = 'Android.html'
} else {
  window.location.href = 'pc.html'
}


/**
 * 判断iOS/Android跳转相对链接
 */
function downApp(){
  var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    urls = {
      'android':'http://dldir1.qq.com/weixin/android/weixin704android1420.apk',
      'ios':'https://itunes.apple.com/cn/app/wei/id414478124',
      'other':'http://weixin.qq.com/d'
    };
  //三元运算
  // window.location.href = isAndroid? urls.android : isiOS? urls.ios : urls.other;
  //简化
  if(isAndroid){
    window.location.href=urls.android;
  }else if(isiOS){
    window.location.href=urls.ios;
  }else{
    window.location.href=urls.other;
  }
}
downApp();

/**
 * 唤起本地APP
 */
const schemeUrl = 'xxx'
window.location.href = schemeUrl;
// 过程是这样：点击 a 标签时，首先会尝试打开 URL scheme ，如果成功，就唤起APP；如果失败，则跳转到 href 属性，即下载页


export default new DeviceUtil()