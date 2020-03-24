<template>
  <div>
    <div class="dress-box">
      <div class="dress-title " :class="{'colorActive': dataList.colorActive}">
        <p>—— {{dataList && dataList.title}} ——</p>
      </div>
      <div class="dress-goods">
        <div class="dress-left" @click="handleDetail(dataList.discountGoods.gid)">
          <div class="dress-main">
            <div class="dress-left-title">
              {{dataList.discountGoods && dataList.discountGoods.title  }}
            </div>
            <div class="dress-left-des">
              <span>精品打折</span>
              <span :class="{'bgActive': dataList.bgActive}"> 
                {{dataList.discountGoods && dataList.discountGoods.price}}元
              </span>
            </div>
            <div class="dress-left-show">
              <div>
                <img v-lazy="dataList.discountGoods && dataList.discountGoods.image" 
                :alt="dataList.discountGoods && dataList.discountGoods.title"
               >
              </div>
            </div>
          </div>
        </div>
        <div class="dress-right" >
          <div class="dress-item" 
          v-for="(item,index) in dataList.choose" 
          :key="item.title"
          @click="handleDetail(item.gid)"
          >
            <div class="dress-right-context">
              <div class="dress-right-title">{{ item.title }}</div>
              <div class="dress-right-des">品质精挑</div>
            </div>
            <div class="dress-right-show">
              <img v-lazy="item.image" :alt="item.title" >
            </div>
          </div>
        
        </div>
      </div>
    </div>
    <!-- more -->
    <more :moreList="dataList.more"></more>
  </div>
</template>

<script>
import More from './More'
export default {
  props: {
    newDressList: {
      type:Object
    }
  },
  components: {
    More
  },
  data() {
    return {
      dataList: {}
    }
  },
  mounted() {
  },
  watch: {
    newDressList(newVal,oldVal) {
      // 读取父组件传递过来的异步数据
      this.dataList = newVal;
    }
  },
  methods: {
    handleDetail(gid)  {
      this.$router.replace('/goods/detail/product?gid='+gid)
    }
  },
 
}
</script>

<style scoped>
.bgActive {
  background: #5fc600 !important;
}
.colorActive {
  color: #5fc600 !important;
}
.dress-box {
  box-sizing: border-box;
  background: #fff;
  margin-top: 0.24rem;
}
.dress-title {
  line-height: 0.64rem;
  text-align: center;
  color: #f73b61;
  font-size: 0.28rem;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
}
.dress-goods {
  box-sizing: border-box;
  overflow: hidden;
  height: 3.5rem;
}
.dress-left,.dress-right {
  width: 50%;
  float: left;
  box-sizing: border-box;
  height: 100%;
}
.dress-left {
  padding: 0.16rem;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding-bottom: 0.2rem;
  font-size: 0.22rem;
  color: #000;
}
.dress-main {
  box-sizing: border-box;
  height: 100%;
}
.dress-left-title {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}
.dress-left-des {
  box-sizing: border-box;
  margin-top: 0.08rem;
}
.dress-left-des span:nth-child(1) {
  color: #cb385d;
}
.dress-left-des span:nth-child(2) {
  display: inline-block;
  color: #fff;
  margin-left: 0.24rem;
  padding: 0.015rem 0.12rem;
  background: #cb385d;
  border-radius: 0.2rem;
}
.dress-left-show {
  box-sizing: border-box;
  padding: 0.16rem;
  padding-bottom: 0;
}
.dress-left-show > div {
  box-sizing: border-box;
  height: 2rem;
  width: 100%;
}
.dress-left-show img {
  width: 100%;
  height: 100%;
}


.dress-item {
  box-sizing: border-box;
  padding: 0.16rem;
  padding-bottom: 0.22rem;
  width: 100%;
  height: 50%;
  display: flex;
  border-bottom: 1px solid #efefef;
}
.dress-right-context {
  width: calc(100% - 1.2rem);
  flex:1;
  font-size: 0.22rem;
}
.dress-right-title {
  color: #000;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}
.dress-right-des {
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.12rem;
}
.dress-right-show {
  width: 1.2rem;
  height: 1.2rem;
}
.dress-right-show img {
  width: 100%;
  height: 100%;
}
/* more */
</style>