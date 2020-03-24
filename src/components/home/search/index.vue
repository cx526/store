<template>
  <div>
    <!-- 顶部搜索 -->
    <div class="search-box ">
      <div class="search">
        <span class="icon iconfont icon-left" @click="goBack()"></span>
        <div class="search-main" @click="goSearch()">
          <span class="icon iconfont icon-search"></span>
          <input placeholder="请输入您要搜索的宝贝" disabled v-model="this.$store.state.keywords"/>
        </div>
        <span class="login">筛选</span>
      </div>
    </div>
    <!-- 选项 -->
    <div class="choose-box">
      <div class="choose-title">
        <div class="choose-all " @click="handleAll()" :class="{'active':isSearchList}">
          <span>综合</span>
          <span class="icon iconfont icon-top" v-if="isSearchList"></span>
          <span class="icon iconfont icon-down" v-else></span>
           
        </div>
        <div class="choose-num" @click="handleSales()">
          <span>销量</span>
        </div>
      </div>
      <div class="choose-list" v-show="isSearchList">
        <div class="choose-item" 
        v-for="(item,index) in chooseList" 
        :key="index"
        :class="{'active':currentIndex == index}"
        @click="handleAllList(item,index)">
          {{item.text}}
        </div>
        <!-- <div class="choose-item">价格由高到低</div>
        <div class="choose-item">价格由高到低</div> -->
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="result-box"  v-if="$store.state.resultList">
      <div class="result-list">
        <div class="result-item"
        v-for="(item,index) in $store.state.resultList" :key="index"
        @click="$router.replace('/goods/detail?gid='+item.gid)">
          <div class="result-left">
            <img :src="item.image" alt="">
          </div>
          <div class="result-right">
            <div class="result-title">{{item.title}}</div>
            <div class="result-price">￥{{item.price}}</div>
            <div class="result-sell">销量<span>{{item.sales}}</span>件</div>
          </div>
        </div>
      </div>
    </div>
    <div class="none" v-else>暂无相关产品</div>
    <search-box :isShow="isShow" @close="close"></search-box>
  </div>
</template>

<script>
import SearchBox from '../../../common/search'
import { request } from '../../../assets/js/until'

export default {
  components: {
    SearchBox
  },
  data() {
    return {
      isShow: false,
      // 控制商品筛选选项
      isSearchList: false,
      // 产品价格高低数据
      chooseList: [
        {
          text: '综合',
          otype: 'all'
        },
        {
          text: '价格由高到低',
          otype: 'down'
        },
        {
          text: '价格由低到高',
          otype: 'up'
        }
      ],
      currentIndex: 0
    }
  },
  created() {

  },
  methods: {
    // 回到首页
    goBack() {
      if(this.$router.currentRoute.query.item == 'item') {
        this.$router.replace('/classify/goods')
      }
      else {
         this.$router.replace('/home')
      }
       
    },
    // 点击输入框显示搜索组件
    goSearch() {
      this.isShow = true
    },
    // 监听搜索组件点击关闭图标时关闭搜索组件
    close() {
      this.isShow = false
    },
    // 点击综合按钮
    handleAll() {
      this.isSearchList = !this.isSearchList
    },
    // 点击选项发送对应不同的请求
    handleAllList(item,index) {
      this.currentIndex = index;
      // 隐藏选项卡
      this.isSearchList = false;
      // 获取当前要筛选的商品名称
      let keywords = this.$store.state.keywords
      request('api/home/goods/search?kwords='+keywords+'&otype='+item.otype+'&token=').then(res => {
        this.$store.commit('getKeywords',{keywords: keywords,resultList:res.data.data})
      })
    },
    // 点击销量按销量排序
    handleSales() {
      // 获取当前要筛选的商品名称
      let keywords = this.$store.state.keywords
      request('api/home/goods/search?kwords='+keywords+'&otype=sales&token=')
      .then(res => {
        this.$store.commit('getKeywords',{keywords: keywords,resultList:res.data.data})
      })
    }
  },
}
</script>

<style scoped>
.none {
  text-align: center;
  margin-top: 0.24rem;
}
/* 搜索结果 */
.result-box {
  box-sizing: border-box;
  padding-top: 0.24rem;
  background: #fff;
}
.result-list {
  box-sizing: border-box;
  padding-left: 0.12rem;
}
.result-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-bottom: 0.24rem;
}
.result-left {
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}
.result-left img {
  width: 100%;
  height: 100%;
}
.result-right {
  box-sizing: border-box;
  flex: 1;
  margin-left: 0.24rem;
  border-bottom: 1px solid #ccc;
}
.result-title,.result-price {
  box-sizing: border-box;
  padding-right: 0.24rem;
  font-size: 0.28rem;
  color: #333;
}
.result-price {
  color: #f00;
   margin-top: 0.16rem;
}
.result-sell {
  font-size: 0.24rem;
  color: #333;
  margin-top: 0.16rem;
  margin-bottom: 0.2rem;
}
.result-sell span {
  color: #fda208;
}
/* 选项 */
.choose-box {
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #efefef;
  margin-top: 1rem;
  position: relative;
}
.choose-title {
  box-sizing: border-box;
  line-height: 0.8rem;
  font-size: 28rpx;
  color: #666;
  border-bottom: 1px solid #efefef;
}
.choose-all,.choose-num {
  display: inline-block;
  box-sizing: border-box;
  padding-left: 0.24rem;
  margin-right: 0.24rem;
}
.choose-list {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0.8rem;
  background: #fff;
  z-index: 99;
  width: 100%;
}
.choose-item {
  line-height: 0.8rem;
  box-sizing: border-box;
  padding-left: 0.24rem;
  border: 1px solid #efefef;
  font-size: 0.24rem;
  color: #999;
}
.active {
  color: #fda208;
}
/* 导航栏 */
.search-box {
  height: 1rem;
  padding: 0.25rem 0.24rem;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  background: #fff;

}
.search-box .search {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  
}
.icon-left {
  font-size: 0.38rem;
  color: #666;
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
  color: #666;
  font-size: 0.32rem;
  border-radius: 0.1rem;
  background: #eaeaea;
}
.search-main span {
  font-size: 0.36rem;
  display: inline-block;
  margin-right: 0.2rem;
}
.search-main input {
  flex: 1;
  border: none;
  outline: none;
   background: #eaeaea;
}
.search .login {
  font-size: 0.32rem;
  color: #666;
}
</style>