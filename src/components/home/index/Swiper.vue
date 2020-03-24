<template>
  <div class="swiper-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
          <a href="#">
            <img :src="item">
          </a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  props: {
    swiperList: {
      type: Array
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.$nextTick(() => {
   // 初始化swiper
      var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,
        observer:true, 
        observeParents:true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    })
  },
}
</script>

<style scoped>
/* swiper */
.swiper-box {
  box-sizing: border-box;
  width: 100%;
  /* height: 3.6rem; */
}
.swiper-box a {
  display: block;
  height: 100%;
}
.swiper-box img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>