<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">管理收获地址</div>
    </div>
    <div class="address-list">
      
      <div class="address-item"  
      v-for="(item,index) in dataList" 
      :key="item.aid"
      @click="manage(item.aid)">
        <div class="address-left">
          <p>
            <span>{{item.name}}</span>
            <span>{{item.cellphone}}</span>
          </p>
          <p>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</p>
        </div>
        <div class="icon iconfont icon-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until'
export default {
  data() {
    return {
      dataList:[]
    }
  },
  // 获取订单列表
  created() {
    request(
      'api/user/address/index?uid='+this.$store.state.uid+'&token='
    ).then(res => {
      if(res.data.code == 200) {
        this.dataList = res.data.data;
      }
      console.log(this.dataList)
    })
  },
  methods: {
    manage(aid) {
      this.$router.push('/address/mod?aid='+aid)
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
  .address-list {
    box-sizing: border-box;
  }
  .address-item {
    box-sizing: border-box;
    /* height: 1rem; */
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #444;
    border-bottom: 1px solid #efefef;
  }
  .address-item > div:nth-child(1) {
    flex: 1;
  }
  .address-item > div:nth-child(1) p {
    margin-bottom: 0.16rem;
  }
</style>