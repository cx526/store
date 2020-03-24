<template>
  <div class="recommend-box">
    <div class="recommend-title">
      <div class="line"></div>
      <span class="title">为您推荐</span>
      <div class="line"></div>
    </div>
    <div class="recommend-list">
      <ul>
        <li class="recommend-item" 
        v-for="(item,index) in recommendList" 
        :key="index"
        @click="handleDetail(item.gid)">
          <div class="recommend-show">
            <img v-lazy="item.image" :alt="item.title" >
            <div class="recommend-des">
              <div class="item-title">
                {{item.title}}
              </div>
              <div class="item-price">￥{{item.price}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendList: {
      type: Array
    }
  },
  data() {
    return {
      
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
.recommend-box {
  box-sizing: border-box;
}
.recommend-title {
  box-sizing: border-box;
  line-height: 1rem;
  display: flex;
  align-items: center;
}
.line {
  flex: 1;
  height: 1px;
  background-color: #d4d4d4;
}
.recommend-title .title {
  font-size: 0.28rem;
  display: inline-block;
  margin:  0 0.12rem;
  color: #000;
}
.recommend-list {
  box-sizing: border-box;
}
.recommend-list ul {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.recommend-item {
  box-sizing: border-box;
  padding: 0.12rem;
  padding-top: 0;
  padding-bottom: 0.24rem;
  width: 50%;
  flex-shrink: 0;
}
.recommend-show {
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  padding-top: 0.24rem;
  padding-bottom: 0.12rem;
}
.recommend-show img {
  width: 2.8rem;
  height: 2.8rem;
}
.recommend-des {
  text-align: left;
  box-sizing: border-box;
  padding: 0 0.08rem;
  font-size: 0.26rem;
}
.item-title {
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
.item-price {
  color: #d32a4e;
}
</style>