import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import ('../components/home/main'),
    // 默认导航到首页
    redirect: '/home',
    meta: { keepAlive: false },
    children: [
      {
        path: 'home',
        name: 'index',
        component: () => import('../components/home/index'),
        meta: { keepAlive: true,title: '商城' },
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../components/home/cart'),
        meta: {keepAlive: false,title: '购物车'}
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('../components/home/my'),
        meta: {keepAlive: false,title: '个人中心'}
      },
    ],
  
  },
    // 搜索
  {
    path: '/classify/goods',
    name: 'classify',
    component: () => import ('../components/home/classify'),
    redirect: '/classify/goods/cid=492',
    children: [
      {
        path: ':cid',
        name: 'item',
        component: () => import('../components/home/classify/item.vue')
      }
    ]
  },
  {
    path: '/goods/search',
    name: 'searchPage',
    component: () => import('../components/home/search')
  },
  // 商品详情
  {
    path: '/goods/detail',
    name: 'goods-main',
    component: () => import('../components/home/detail/main.vue'),
    redirect: '/goods/detail/product',
    children: [
      {
        path:'product',
        name:'product',
        component: () => import('../components/home/detail/product.vue')
      },
      {
        path:'details',
        name:'detail',
        component: () => import('../components/home/detail/detail.vue')
      },
      {
        path:'appraise',
        name:'appraise',
        component: () => import('../components/home/detail/appraise.vue')
      },
    ],
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/home/my/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/home/my/register.vue')
  },
  // 订单
  {
    path: '/order',
    name: 'order',
    component: () => import('../components/home/order')
  },
  // 选择地址
  {
    path: '/address',
    name: 'address',
    component: () => import('../components/home/order/address.vue')
  },
  // 添加地址
  {
    path: '/address/add',
    name: 'add-address',
    component: () => import('../components/home/order/add.vue')
  },
  // 修改地址
  {
    path: '/address/mod',
    name: 'mod-address',
    component: () => import('../components/home/order/mod.vue')
  },
  // 个人资料
  {
    path: '/my/user',
    name: 'user',
    component: () => import('../components/home/my/user.vue')
  },
  // 管理地址
  {
    path: '/my/manage',
    name: 'manage-my',
    component: () => import('../components/home/my/manage.vue')
  },
  // 修改密码
  {
    path: '/my/modpwd',
    name: 'modpwd-my',
    component: () => import('../components/home/my/modpwd.vue')
  },
  // 我的收藏
  {
    path: '/my/collect',
    name: 'collect-my',
    component: () => import('../components/home/my/collect.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
