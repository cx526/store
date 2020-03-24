<template>
  <div class="container" style="box-sizing:border-box;padding-bottom: 1.2rem">
    <!-- 顶部搜索 -->
    <div class="search-box " :class="{'scrollActive': isScroll}">
      <div class="search">
        <span class="icon iconfont icon-menu"></span>
        <div class="search-main" @click="handleSearch()">
          <span class="icon iconfont icon-search"></span>
          <div>请输入您要搜索的宝贝</div>
        </div>
        <span class="login" 
        v-if="!this.$store.state.uid"
        @click="$router.push('/login')">
        登录
        </span>
        <span 
        style="font-size: 0.4rem;color: #fff" 
        class="icon iconfont icon-mine" 
        @click="$router.push('/my')"
        v-else>
        </span>
      </div>
    </div>
    <!-- swiper -->
    <swiper :swiperList="swiperList"></swiper>
    <!-- nav -->
    <Nav :navList="navList"></Nav>
    <!-- 潮流女装 -->
    <clothing  :newDressList="newDressList"></clothing>
    <!-- 品牌男装 -->
    <men :menList="newMenList"></men>
    <!-- 电脑办公 -->
    <clothing :newDressList="newOfficeList"></clothing>
    <!-- 为您推荐 -->
    <recommend :recommendList="recommendList"></recommend>
    <!-- 搜索页 -->
    <Search :isShow="isShow" @close="close"></Search>
  </div>
</template>

<script>
import {request} from '../../../assets/js/until'
import Clothing from './Clothing'
import Men from './Men'
import Recommend from './Recommend'
import Swiper from './Swiper'
import Nav from './Nav'
import Search from '../../../common/search'
export default {
  data() {
    return {
      // 存储轮播图数据
      swiperList: [],
      // 控制导航栏是否变色
      isScroll:false,
      // 存储导航栏数据
      navList: [],
      // 潮流女装数据
      newDressList: {},
      // 品牌男装数据
      newMenList: {},
      // 电脑办公数据
      newOfficeList: {},
      // 推荐商品模拟数据
      recommendList: [],
      // 搜索显示
      isShow: false
    }
  },
  components: {
    Clothing,
    Men,
    Recommend,
    Swiper,
    Nav,
    Search
  },
  created() {
    this.scroll = true;
    // 添加页面滚动事件
    window.addEventListener('scroll',this.eventScroll);
      // 请求轮播图数据
    request('api/home/index/slide?token=').then(res => {
      let data = res.data.data
      for(let i = 0;i < data.length;i++) {
        this.swiperList.push(data[i].image)
      }
    })
    // 请求导航栏数据
    request('api/home/index/nav?token=').then(res => {
      this.navList = res.data.data
    })
    // 请求产品数据
    request('api/home/index/goodsLevel?token=').then(res => {
      let data =res.data.data
      for(let i = 0;i < data.length;i++) {
        switch(data[i].title) {
          case '潮流女装':
            this.handleData(data[i])
            break;
          case '品牌男装':
            this.handleData(data[i])
            break;
          case '电脑办公':
            this.handleData(data[i])
            break
        }
      }
    })
    // 请求推荐商品数据
    request('api/home/index/recom?token=').then(res => {
      this.recommendList = res.data.data
    })
  },
  methods: {
    // 导航条滚动到一定程度变色
    eventScroll() {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop > 200) {
          if(this.scroll) {
              // 大于200后变色且不再触发
              this.isScroll = true;
              this.scroll = false
            }
          }
        else {
          this.scroll = true;
          this.isScroll= false
        }
    },
    // 处理潮流女装，品牌男装，电脑办公数据
    handleData(data) {
      if(data.title == '潮流女装') {
        this.newDressList = {
          title: data.title,
          colorActive: false,
          bgActive: false,
          discountGoods: {},
          choose: [],
          more:[]
        }
        this.newDressList.discountGoods = data.items[0];
        for(let i = 1;i < 3;i++) {
          this.newDressList.choose.push(data.items[i])
        };
        for(let j = 3;j < data.items.length;j++) {
          this.newDressList.more.push(data.items[j])
        }
      }
      else if(data.title == '电脑办公') {
        this.newOfficeList = {
          title: data.title,
          colorActive: true,
          bgActive: true,
          discountGoods: {},
          choose: [],
          more:[]
        }
        this.newOfficeList.discountGoods = data.items[0];
        for(let i = 1;i < 3;i++) {
          this.newOfficeList.choose.push(data.items[i])
        };
        for(let j = 3;j < data.items.length;j++) {
          this.newOfficeList.more.push(data.items[j])
        }
      }
      else if(data.title == '品牌男装') {
        this.newMenList = {
          hot: [],
          more: []
        }
        for(let z = 0;z < data.items.length;z++) {
          z < 2 ?  this.newMenList.hot.push(data.items[z]): this.newMenList.more.push(data.items[z])
        }
      }
    },
    // 点击显示搜索页
    handleSearch() {
      this.isShow = true
    },
    // 关闭搜索页
    close(val) {
      this.isShow = val
    }
 
  },

  beforeRouteLeave (to, from, next) {
  //离开该页面的时候把高度记录
    window.CateListScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    next()
  },
  // 移除事件
  destroyed() {
    window.removeEventListener('scroll',this.eventScroll);
  },
  // 页面有缓存，移除事件后需要重新添加
  activated() {
    window.addEventListener('scroll',this.eventScroll);
    // 回到之前离开页面时的滚动的高度
    window.scrollTo(0, window.CateListScrollTop);
  
  },
  // 监听某个页面的keep-alive为true时离开页面的事件
  deactivated() {
    window.removeEventListener('scroll',this.eventScroll)
  }

}
</script>

<style scoped>

/* 导航栏 */
.search-box {
  height: 1rem;
  padding: 0.25rem 0.24rem;
  background: linear-gradient(rgba(1,1,1,.2),hsla(0,0%,100%,0));
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
.scrollActive {
    background: linear-gradient(#eb1625,hsla(0,0%,100%,0));
}
.search-box .search {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  
}
.icon-menu {
  font-size: 0.38rem;
  color: #fff;
}
.search-main {
  flex: 1;
  position: relative;
  background: hsla(0,0%,100%,.6);
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  padding-left: 0.2rem;
  color: #fff;
  font-size: 0.32rem;
  border-radius: 0.1rem;
}
.search-main span {
  font-size: 0.36rem;
  display: inline-block;
  margin-right: 0.2rem;
}
.search-main div {
  flex: 1;
}
.search .login {
  font-size: 0.32rem;
  color: #fff;
}


</style>