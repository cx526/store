<template>
  <div class="search-container" v-show="isShow">
    <div class="search-box">
      <div class="search">
        <span class="icon iconfont icon-error" @click="close()"></span>
        <div>
          <input type="text" placeholder="请输入您要搜索的宝贝" v-model="nearText">
        </div>
        <span @click="nearSearch()">搜索</span>
      </div>
    </div>
    <!-- 最近搜索 -->
    <div class="near-box" v-if="this.$store.state.nearSearchList.length > 0">
      <div class="near-search">
        <p class="near-main">最近搜索</p>
        <p class="icon iconfont icon-laji" @click="handleClear()"></p>
      </div>
      <div class="near-context">
          <ul>
            <li 
            v-for="(item,index) in this.$store.state.nearSearchList" 
            :key="index"
            @click="nearListSearch(item)"
            >
            {{item}}
            </li>
          </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
     <div class="near-box" style="margin-top: 0.2rem">
      <div class="near-search">
        <p class="near-main">热门搜索</p>
      </div>
      <div class="near-context">
          <ul>
            <li
             v-for="(item,index) in hotSearchList" 
             :key="index"
             @click="goSearch(item.title)">
             {{item.title}}
             </li>
          
          </ul>
      </div>
    </div>
  
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { request } from '../../assets/js/until'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    item: {
      type: String
    }
  },
  data() {
    return {
      // 存储最新搜索数据
      nearText: '',
      nearSearchList: this.$store.state.nearSearchList?this.$store.state.nearSearchList : [],
      // 存储热门搜索数据
      hotSearchList: []
    }
  },
  created() {
    
    // 获取热门搜索的数据
    request('api/home/public/hotwords?token=').then(res => {
      if(res.data.code == 200) {
        let hotSearchList = res.data.data;
        for(let i = 0;i < hotSearchList.length;i++) {
          if(hotSearchList[i].title == '') {
            hotSearchList.splice(i,1)
          }
        }
        this.hotSearchList = hotSearchList
      }
    })
  },
  // 关闭
  methods: {
    close() {
      this.$emit('close',false)
    },
    // 点击搜索，处理最近搜索
    nearSearch() {
      // 如果重复或者为空则不添加
      if(this.nearText) {
        if(this.nearSearchList.length > 0) {
          for(let i = 0;i < this.nearSearchList.length;i++) {
            if(this.nearSearchList[i] == this.nearText) {
              this.nearSearchList.splice(i,1)
            }
          }
        }
        this.nearSearchList.unshift(this.nearText);
        this.$store.commit('handleNearSearch',{nearSearchList:this.nearSearchList})
      }
      // 如果是从首页进入search组件页面时
      if(this.$router.currentRoute.name == 'index') {
        console.log(111)
        this.$router.replace('/goods/search');
        this.$store.dispatch('getKeywords',{keywords: this.nearText})
      }
      // 从搜索结果页打开search组件时
      else if(this.$router.currentRoute.name == 'searchPage') {
        this.$store.dispatch('getKeywords',{keywords: this.nearText})
        this.$emit('close')
      }
      
      
      
     
      
    },
    // 删除最近搜索
    handleClear() {
      Dialog.confirm({
        title: '',
        message: '确认是否删除'
        }).then(() => {
          this.$store.commit('clearNearSearch')
        }).catch(() => {
          // on cancel
        });
    },
    // 点击热门搜索下的子选项
    goSearch(title) {
      // 点击时将数据添加到最近搜索里
      this.$store.commit('goSearch',{title: title})
      // 如果是从首页进入search组件页面时
      console.log(title)
      if(this.$router.currentRoute.name == 'index' || this.$router.currentRoute.name == 'item') {
        this.$router.replace('/goods/search');
        this.$store.dispatch('getKeywords',{keywords: title})
      }
      // 从搜索结果页打开search组件时
      else if(this.$router.currentRoute.name == 'searchPage') {
        this.$store.dispatch('getKeywords',{keywords: title})
        this.$emit('close')
      }
    },
    // 点击最新搜索下的子选项
    nearListSearch(item) {
          // 如果是从首页进入search组件页面时
      if(this.$router.currentRoute.name == 'index' || this.$router.currentRoute.name == 'item') {
        this.$router.replace('/goods/search?item='+this.item);
        this.$store.dispatch('getKeywords',{keywords: item})
      }
      // 从搜索结果页打开search组件时
      else if(this.$router.currentRoute.name == 'searchPage') {
        this.$store.dispatch('getKeywords',{keywords: item})
        this.$emit('close')
      }
    }
  },
}
</script>

<style scoped>
  .search-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
  }
  .search-box {
    box-sizing: border-box;
    padding: 0.25rem 0.15rem;
    background: #fff;
  }
  .search {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .icon-error {
    font-size: 0.32rem;
  }
  .search span:last-child {
    font-size: 0.28rem;
  }
  .search > div {
    flex: 1;
    height: 0.8rem;
    box-sizing: border-box;
    margin: 0 0.2rem;
  }
  .search > div > input {
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    padding-left: 0.2rem;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 0.1rem
  }
  .near-box {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .near-search {
    box-sizing: border-box;
    padding:  0 0.2rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.16rem;
  }
  .near-main {
    font-size: 0.32rem;
    color: #ccc;
    flex: 1
  } 
  .icon-laji {
    font-size: 0.32rem;
    color: #ccc;
  }
  .near-context {
    box-sizing: border-box;
    padding: 0 0.1rem;
  }
  .near-context ul {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 0.2rem;
  }
   .near-context ul li {
    box-sizing: border-box;
    margin-right: 0.25rem;
    width: calc(25% - 0.22rem);
    border: 1px solid #ccc;
    font-size: 0.28rem;
    color: #ccc;
    line-height: 0.25rem;
    margin-bottom: 0.24rem;
    border-radius: 0.25rem;
    padding: 0.1rem;
    text-align: center;
   }
    .near-context ul li:nth-child(4n) {
      margin-right: 0;
    }

</style>