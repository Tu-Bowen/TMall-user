/**
 * 
 * @param {String} src 图片链接
 * @param {Function} resolve 创建
 * @param {Function} reject
 */
 export function loadImageAsync(src, resolve, reject){
    let image = new Image()
    image.src = src
    image.onload = resolve
    image.onerror = reject
  }
  /**
   * 函数节流
   * @param {Function} action 回调函数
   * @param {Number} delay 延迟的时间
   */
  export function throttle(action, delay) {
    var timeout = null
    var lastRun = 0
    return function () {
      if (timeout) {
        return
      }
      var elapsed = Date.now() - lastRun
      var context = this
      var args = arguments
      var runCallback = function runCallback() {
        lastRun = Date.now()
        timeout = false
        action.apply(context, args)
      }
      if (elapsed >= delay) {
        runCallback()
      } else {
        timeout = setTimeout(runCallback, delay)
      }
    }
  }
  /**
   * 获取可以滚动的父元素
   * @param {Object} el 实例
   */
  export function getScrollParent(el){
    let parent = el.parentNode
    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break
          }
      
          if (!parent.parentNode) {
            break
          }
      // 判断父级元素是不是可以滚动的
      if (/scroll|auto/.test(getComputedStyle(parent)['overflow'])) {
        return parent
      }
      parent = parent.parentNode
    }
    return window
  }
  /** 
   * 从数组中移除某个元素
   * @param {Array} arr 目标数组
   * @param {Object} item 移除元素
   */
  export function remove (arr, item) {
    if (!arr.length) return
    const index = arr.indexOf(item)
    if (index > -1) return arr.splice(index, 1)
  }
  /**
   * 检查数组中是否含有某个属性
   * @param {Array} arr 检查的数组对象
   * @param {Function} fn 检查的方法
   */
  export function has (arr, fn) {
    let has = false
    for (let i = 0, len = arr.length; i < len; i++) {
      if (fn(arr[i])) {
        has = true
        break
      }
    }
    return has
  }
  export function find(arr,fn) {
      let target = null
      for (let i = 0, len = arr&&arr.length; arr&&i < len; i++) {
        if (fn(arr[i])) {
          target=arr[i]
          break
        }
      }
      return target
  }