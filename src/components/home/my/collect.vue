<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">我的收藏</div>
    </div>
    <div class="collect-list">
      <div class="collect-item" v-for="(item,index) in list" :key=index>
        <div class="collect-img">
          <img :src="item.image" alt="">
        </div>
        <div class="collect-title">
          <span>{{item.title}}</span>
        </div>
        <div class="collect-price">
          <span>￥{{item.price}}</span>
        </div>
        <div class="collect-btn">
          <div @click="handleDetail(item.gid)"><span>购买</span></div>
          <div @click="del(index,item.fid)"><span>删除</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {request} from '../../../assets/js/until'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data() {
    return {
      page: 1,
      list: []
    }
  },
  created() {
    request(
      'api/user/fav/index?uid='+this.$store.state.uid+'&page='+this.page+'&token='
    ).then(res => {
      console.log(res)
      if(res.data.code == 200) {
        this.list = res.data.data
      }
    })
  },
  methods: {
    // 点击购买
    handleDetail(gid)  {
      this.$router.replace('/goods/detail/product?gid='+gid)
    },
    // 点击删除
    del(index,fid) {
      request(
        'api/user/fav/del?uid='+this.$store.state.uid+'&fid='+fid+'&token='
      ).then(res => {
        console.log(res);
        if(res.data.code == 200) {
          Toast('删除成功');
          this.list.splice(index,1)
        }
      })
    }
  },
}
</script>

<style scoped>
  .body-bg{
    box-sizing: border-box;
    padding-bottom: 1rem;
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
    background-color: #fff;
    z-index: -1;
  }
  .top {
    box-sizing: border-box;
    line-height: 1rem;
    border: 1px solid #E5E5E5;
    padding-left: 0.24rem;
    padding-right: 0.44rem;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .top > span {
    font-size: 0.4rem;
  }
  .top .mian {
    display: inline-block;
    flex: 1;
  }
  .collect-list {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .collect-item {
    box-sizing: border-box;
    width: 50%;
    padding: 0.16rem;
  }
  .collect-img {
    width: 100%;
    height: 3rem;
  }
  .collect-item img {
    width: 100%;
    height: 100%;
  }
  .collect-title {
    font-size: 0.24rem;
     margin-top: 0.16rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .collect-price {
    color: #f00;
    font-size: 0.24rem;
    margin-top: 0.16rem;
  }
  .collect-btn {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.16rem;
    line-height: 0.5rem;
    color: #f00;
    
  }
  .collect-btn div {
    display: inline-block;
    border: 1px solid #f00;
    font-size: 0.24rem;
    padding: 0 0.16rem;
    border-radius: 0.08rem;
  }
  
</style>