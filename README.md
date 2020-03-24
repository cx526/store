启动：
### 根目录下安装依赖npm install
### npm run serve 运行





















### 1.Vue中父子组件传值涉及到异步数据时，需要注意当渲染页面时数据是否有拿到，只有确保数据拿到才渲染DOM，常见如payload && payload.title
### 2.图片懒加载：
### import echo from './echo.min.js';同时导出一个方法：
### function lazyImg(){
###    echo.init({
###        offset : 100,//可视区域多少像素可以被加载
###        throttle : 0 //设置图片延迟加载的时间
###    });
### export default {lazyImg}
### 在main的js下引入该文件import utils from './assets/js/index'，同时通过Vue.prototype.$utils = utils挂载到全局
### 确保数据存在才去做操作，需要在请求数据成功调用下this.$utils.lazyImg()
### 在需要懒加载组件部位填上<img src="../../../assets/images/grey.jpg" alt="" :data-echo="item.image">，其中,data-echo才是真正的图片路径
### 3.基于better-scroll实现上拉加载更多和下拉刷新思路：
### 每次都要去配置开启上拉或者下拉
### 调用上拉加载更多和下拉刷新事件
### 结束后需要调用上拉或下拉方法告知bette-scroll已经完成，方便下次数据加载;例：
###    this.$nextTick(() => {
###      this.scroll = new BScroll(this.$refs.wrapper,
###      {
###        probeType:1,
###        pullDownRefresh:{ threshold: 20 },
###        pullUpLoad: { threshold: 20 }
###      });
###      this.scroll.on('pullingDown',()=>{
###        console.log('下拉刷新')
###        setTimeout(() => {
###          this.scroll.finishPullDown()；
###           this.scroll.refresh()
###        },2000)                
###      });
###      this.scroll.on('pullingUp',() => {
###        console.log('上拉加载')
###        this.scroll.finishPullUp()
###        this.scroll.refresh()
###      })
###    })
### 4.关于本地存储localStorage：
### 存储时直接传健名：localStorage['name'];删除时localStorage.removeItem('name')；一般只存储字符串，取得时候用JSON.parse
### 5.Vue配合animated做进出场动画
###  <transition
###  enter-active-class="animated slideInUp"
###  leave-active-class="animated fadeOut">
###  </transition>
### 6.曲线动画TweenMax