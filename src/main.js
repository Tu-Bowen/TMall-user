import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './plugins/element.js'
import VueLazyload from './plugins/lazyload/index'
import {validate} from './api/login'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/images/error.png',
  loading: 'static/images/load.gif',
  attempt: 1
});
Vue.config.productionTip = false;

// 守卫
router.beforeEach((to, from, next) => {
  validate().then(res => {
    console.log(res)
    let data = res.data;
    if (data.state === 0) {
      // 用户要登录
      if (to.matched.some(record => record.meta.auth)) {
        // 用户未登录 需要跳转登录页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next();
      }
    } else {
      // 保存用户的信息
      let {userinfo}=data
      userinfo.file=""
      store.commit('ISLOGIN', userinfo)
      store.commit('SOCKET')
      if (to.path === '/login') {
        router.push({
          path: '/'
        })
      }
      next();
    }
  }).catch(error => {
    console.log(error);
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
