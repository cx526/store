import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, { // 注意：此项一定要写在new Vue（{}）之前，否则会报错：[Vue warn]: Failed to resolve directive: lazy
  preload: 1.3, // 预加载高度比例
  loading: './assets/images/grey.jpg', // 预加载图片
  attempt: 6, // 尝试加载图片数量
  observer: true,
  observerOptions: {
      rootMargin: '0px',
      threshold: 0.1
  }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
