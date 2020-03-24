<template>
  <div>
    <!-- search -->
    <div class="serach-box">
      <div class="search">
        <p class="icon iconfont icon-left" @click="goBack()"></p>
        <div @click="showSearch()">
          <span>请输入宝贝名称</span>
        </div>
      </div>
    </div>
    <!-- main -->
    <div class="main">
      <div class="main-left" ref="wrapper" :style="cssText">
        <ul>
          <li 
          v-for="(item,index) in navList" :key="index"
          :class="{'active':currentIndex == index}" 
          @click="handleClick(index,item.cid,true)"
          ref="item">
          {{item.title}}
          </li>
        </ul>
      </div>
      <div class="main-right">
        <router-view></router-view>
      </div>
      
    </div>
    <search :isShow="isShow" item='item' @close="close"></search>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Search from '../../../common/search'
import {request} from '../../../assets/js/until'
export default {
  data() {
    return {
     cssText: {
       height: ''
     },
     currentIndex : 0,
     navList: [],
     product: [],
     flag: true,
     loading:true,
     leftLoading: false,
     rightLoading: false,
     cid: '',
     isShow: false
    }
  },
  components: {
    Search
  },
  created() {
    let cid = this.$route.params.cid.split('=')[1]
    this.cssText.height = window.innerHeight - 50 + 'px';
  //  请求左侧选项数据
    request('api/home/category/menu?token=').then(res => {
      if(res.data.code == 200) {
        this.navList = res.data.data;
        this.$nextTick(()=>{
           this.navList.map((item,index) => {
            if(item.cid == cid) {
            this.currentIndex = index;
            }
          })
        })
      }
      
      
    })
  // 进来需要请求一次
  
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,
      {
        // 分发原本被禁用的点击事件
        click: true
      });
    })
    
  },
  methods: {
    // 点击出现搜索组件
    showSearch() {
      this.isShow = true
    },
    // 监听子组件发出的时间
    close(flag) {
      this.isShow = flag
    },
    // 点击请求不同类型商品
    handleClick(index,cid,success) {
      // 实现点击滚动
      if(success) {
        let scrollTop = (this.$refs.item)[0].offsetHeight * index
        let clientH = parseInt(this.cssText.height);
        let allItemH = this.$refs.item.length * (this.$refs.item)[0].offsetHeight;
        if(allItemH > clientH + scrollTop) {
          this.scroll.scrollTo(0,-scrollTop,1000);
          this.scroll.refresh()
        }
        else {
          this.scroll.scrollTo(0,-(allItemH-clientH),1000);
          this.scroll.refresh()
        } 
      }
      this.currentIndex = index;
      this.loading = true;
      this.$router.replace('/classify/goods/cid='+cid)
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
  .main-right {
    box-sizing: border-box;
    padding: 0 0.2rem;
    flex: 1;
    max-width: calc(100% - 1.8rem);
    overflow: auto;
  }

  .serach-box {
    box-sizing: border-box;
    height: 1rem;
    background: #fff;
    padding-left: 0.2rem;
  }
  .search {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  
  }
  .icon-left {
    font-size: 0.4rem;
  }
  .search div {
    flex: 1;
    height: 0.7rem;
    line-height: 0.7rem;
    box-sizing: border-box;
    border: 1px solid #999;
    max-width: 80%;
    border-radius: 0.1rem;
    margin-left: 0.2rem;
    padding-left: 0.2rem;
    outline: none;
  }
  .main {
    box-sizing: border-box;
    display: flex;
  }
  .main-left {
    width: 1.8rem;
    overflow: auto;
    flex-shrink: 0;
  }
  .main-left ul {
    box-sizing: border-box;
  }
  .main ul li {
    line-height: 0.8rem;
    font-size: 0.24rem;
    text-align: center;
    background: #fff;
    color: #333;
  }
  .main ul li.active {
    color: #f00;
  }
  


</style>