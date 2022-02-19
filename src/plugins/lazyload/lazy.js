import Listener from "./listener.js"
import { throttle, getScrollParent, find, remove } from './util.js'
const Lazy = Vue => {
    class LazyClass {
        constructor(options) {
            this.options = options
            this.bindHandle = false // 是否已经绑定 scroll 事件
            this.listenerQueue = []
        }

        add(el, bindings, vnode) {
            Vue.nextTick(() => {
                let scrollParent = getScrollParent(el)
                if (scrollParent && !this.bindHandle) {
                    this.bindHandle = true
                    scrollParent.addEventListener('scroll', throttle(this.handleLazyLoad.bind(this),
                        200))
                }
                // 判断这个元素是否在容器的可视区域内，如果不在就不需要渲染
                const listener = new Listener({
                    el,
                    src: bindings.value,
                    options: this.options,
                    elRender: this.elRender.bind(this),
                })
                // 把每一个图片实例都放进数组里
                this.listenerQueue.push(listener)
                this.handleLazyLoad()
            })
        }
        update(el, bindings, vnode) {
            Vue.nextTick(() => {
                if (!el) return
                let exit = find(this.listenerQueue, item => item.el === el)
                if (!exit) {
                    this.add(el, bindings, vnode)
                } else {
                    exit.update(bindings.value)
                }
                this.handleLazyLoad()
            })
        }
        remove(el) {
            Vue.nextTick(() => {
                console.log("移除")
                if (!el) return
                let exit = find(this.listenerQueue, item => item.el === el)
                if (exit) {
                    remove(this.listenerQueue, exit)
                }
            })
        }
        handleLazyLoad() {
            // 遍历所有的图片，如果没有加载过并且在可视区域内就加载图片
            this.listenerQueue.forEach(listener => {
                if (!listener.state.loading) {
                    let catIn = listener.checkInView()
                    catIn && listener.load()
                }
            })
        }
        // 渲染方法
        elRender(listener, state) {
            let el = listener.el
            let src = ''
            switch (state) {
                case 'loading':
                    src = listener.options.loading || '' // 用户传进来的 loading
                    break
                case 'error':
                    src = listener.options.error || '' // 用户传进来的 error
                    break
                default:
                    src = listener.src
                    break
            }
            el.setAttribute('src', src)
        }
    }
    return LazyClass
}
export default Lazy
