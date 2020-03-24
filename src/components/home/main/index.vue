<template>
  <div>
    <router-view></router-view>
    <div class="footer">
      <ul>
          <li
          v-for="(item,index) in tabBarList" 
          :key="index"
          @click="handleClick(item.path,index)"
          :class="{'active': currentIndex == index}"
          >
            <p :class="item.icon"></p>
            <p>{{ item.text }}</p>
          </li>      
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      tabBarList: [
        {
          icon: 'icon iconfont icon-iconindexsel',
          text: '首页',
          path: '/home'
        },
          {
          icon: 'icon iconfont icon-daishouhuo',
          text: '购物车',
          path: '/cart?'
        },
          {
          icon: 'icon iconfont icon-mine',
          text: '我的',
          path: '/my'
        }
      ]
    }
  },
  methods: {
    handleClick(url,index) {
      this.currentIndex = index
      this.$router.replace(url);
    },

  },
  created() {
    // 同步文档标题
      document.title = this.$route.meta.title
      switch(this.$route.name) {
      case('index'):
        this.currentIndex = 0
        break
      case('cart'):
        this.currentIndex = 1
        break
      case('my'):
        this.currentIndex = 2
        break
      default:
        this.currentIndex = 0
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 修改文档的title
    document.title = to.meta.title
    switch(to.name) {
      case('index'):
        this.currentIndex = 0
        break
      case('cart'):
        this.currentIndex = 1
        break
      case('my'):
        this.currentIndex = 2
        break
      default:
        this.currentIndex = 0
    }
    next()
  },
  // 首页有缓存，设置了keep-alive不会再重新渲染dom，后需要手动去调用让其重新更新
  activated() {
    // 同步文档标题
      document.title = this.$route.meta.title
      switch(this.$route.name) {
      case('index'):
        this.currentIndex = 0
        break
      case('cart'):
        this.currentIndex = 1
        break
      case('my'):
        this.currentIndex = 2
        break
      default:
        this.currentIndex = 0
    }
  },
}
</script>

<style scoped>
.footer {
  box-sizing: border-box;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #FFF;
}
.footer ul {
  display: flex;
  align-items: center;
  height: 100%;
}
.footer ul li {
  box-sizing: border-box;
  flex: 1;
  text-align: center;
}
.footer ul li .iconfont {
  font-size: 0.55rem;
}
.active {
  color: #eb1625;
}


</style>