import {
	loadImageAsync
} from './util.js'
// 每一个图片元素都构造成一个类的实例，方便扩展
class Listener {
	constructor({
		el,
		src,
		options,
		elRender
	}) {
		this.el = el
		this.src = src
		this.options = options
        this.rect=null
		this.state = {
			loading: false, // 是否加载过
			error: false, // 是否出错
		}
		this.elRender = elRender
	}
    //更新这里重新
    update(src){
        this.src=src
        this.state={
            loading:false,
            error:false
        }
    }
    getRect(){
        this.rect=this.el.getBoundingClientRect()
    }
	// 检测当前图片是否在可是区域内
	checkInView() {
        this.getRect()
		return (this.rect.top < window.innerHeight * this.options.preLoad) 
	}
	// 加载这个图片
	load() {
		// 先加载 loading 图片
		// 加载成功则替换成正常的图片
		this.elRender(this, 'loading')
		loadImageAsync(
			this.src,
			() => {
				setTimeout(() => {
					this.state.loading = true
					this.elRender(this, 'finish')
				}, 1000)
			},
			() => {
				this.state.error = true
				this.elRender(this, 'error')
			}
		)
	}
}

export default Listener
