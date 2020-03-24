<template>
  <div>
    <!-- nav -->
    <div class="nav-box">
      <div class="nav">
        <span class="icon iconfont icon-left" @click="goBack()"></span>
        <div class="main">
          <span 
          v-for="(item,index) in dataList" :key="index" 
          @click="handleClick(index)"
          :class="{'isActive': $store.state.currentIndex == index}">
          {{item}}
          </span>
        </div>
        <span class="icon iconfont icon-shopping-cart-o" id="cart"></span>
      </div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      dataList: ['商品','详情','评价'],
      // currentIndex: 0
    }
    
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.replace('/')
    },
    handleClick(index) {
      let gid = this.$store.state.gid;
      switch (index) {
        case 0:
          this.$router.replace('/goods/detail/product?gid='+gid);
          this.$store.commit('getCurrentIndex',0)
          break;
        case 1:
          this.$router.replace('/goods/detail/details?gid='+gid);
            this.$store.commit('getCurrentIndex',1)
          break;
        case 2: 
          this.$router.replace('/goods/detail/appraise?gid='+gid);
            this.$store.commit('getCurrentIndex',2)
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style scoped>
  .isActive {
    color: #fda208;
  }
   .nav-box {
    box-sizing: border-box;
    line-height: 0.8rem;
    border-bottom: 1px solid #efefef;
    background: #fff;
    padding: 0.18rem;
    height: 1.2rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  .nav {
    box-sizing: border;
    display: flex;
    align-items: center;
  }
  .nav .icon {
    font-size: 0.5rem;
  }
  .nav .main{
    box-sizing: border;
    display: flex;
    align-items: center;
    flex: 1;
    margin: 0 0.24rem;
  }
  .nav > div > span {
    flex: 1;
    font-size: 0.28rem;
    box-sizing: border-box;
    text-align: center;
  }
  .active {
    color: #fda208;
  }
</style>