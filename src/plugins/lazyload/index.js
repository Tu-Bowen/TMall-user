import Lazy from './lazy.js';
let VueLazyLoad={
	install(Vue,options={}){
		let Lazyclass=Lazy(Vue)
		let lazy=new Lazyclass(options)
		Vue.directive('lazy',{
			bind:lazy.add.bind(lazy),
            update:lazy.update.bind(lazy),
            componentUpdated:lazy.handleLazyLoad.bind(lazy),
            unbind:lazy.remove.bind(lazy)
		})
	}
}
export default VueLazyLoad