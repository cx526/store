<template>
  <div class="men-box">
    <div class="men-title">
        <p>—— 品牌男装 ——</p>
    </div>
    <div class="men-goods">
      <div class="hot-sale" 
      v-for="(item,index) in menList.hot" 
      :key="index"
      @click="handleDetail(item.gid)">
        <div class="hot-title">
          {{ item.title }}
        </div>
        <div class="hot-des">火爆销售</div>
        <div class="hot-show">
          <img :src="item.image" :alt="item.title">
        </div>
      </div>
    </div>
    <more :moreList="menList.more"></more>
  </div>
</template>

<script>
import More from './More'
export default {
  components: {
    More
  },
  props: {
    menList: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleDetail(gid) {
      this.$router.replace('/goods/detail/product?gid='+gid)
    }
  },
}
</script>

<style scoped>
.men-box {
  box-sizing: border-box;
  margin-top: 0.24rem;
  background: #fff;
}
.men-title {
  line-height: 0.64rem;
  font-size: 0.28rem;
  text-align: center;
  border-bottom: 1px solid #efefef;
}
.men-title p {
  color: #fe6719;
}
.men-goods {
  box-sizing: border-box;
  overflow: hidden;
}
.men-goods .hot-sale:nth-child(1) {
  border-right: 1px solid #efefef;
}  
.hot-sale {
  box-sizing: border-box;
  padding: 0.16rem 0.12rem;
  width: 50%;
  float: left;
  border-bottom: 1px solid #efefef;
}
.hot-title {
  box-sizing: border-box;
  font-size: 0.22rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}
.hot-des {
  box-sizing: border-box;
  margin-top: 0.12rem;
  color: #7b7f82;
  text-align: center;
  font-size: 0.22rem;
}
.hot-show {
  text-align: center;
  margin-top: 0.12rem;
}
.hot-show img {
  width: 1.8rem;
  height: 2rem;
}
</style>