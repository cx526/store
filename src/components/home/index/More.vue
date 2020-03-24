<template>
  <div class="dress-more">
    <ul>
      <li class="more-item" 
      v-for="item in dataList" 
      :key="item.title"
      @click="handleDetail(item.gid)"
      >
        <div class="more-title">{{ item.title }}</div>
        <div class="more-show">
          <div>
            <img v-lazy="item.image" :alt="item.title" >
          </div>
        </div>
        <div class="more-price">
          <p>￥{{ item.price }}</p>
          <p>￥{{ item.price * 2 }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    moreList: {
      type: Array
    }
  },
  data() {
    return {
      dataList: []
    }
  },
  watch: {
    moreList(newVal,oldVal) {
      this.dataList = newVal
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
.dress-more {
  box-sizing: border-box;
}
.dress-more ul {
  display: flex;
  box-sizing: border-box;
}
.more-item {
  flex: 1;
  flex-shrink: 0;
  width: 25%;
  box-sizing: border-box;
  background: #fff;
  padding-top: 0.16rem;
  padding-bottom: 0.08rem;
}
.more-title {
  box-sizing: border-box;
  font-size: 0.22rem;
  color: #000;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.more-show {
  box-sizing: border-box;
  padding: 0.12rem;
}
.more-show div {
  width: 100%;
  height: 1.5rem;
}
.more-show img {
  width: 100%;
  height: 100%;
}
.more-price {
  text-align: center;
}
.more-price p {
  font-size: 0.2rem;
}
.more-price p:first-child {
  color: #d32a4e;
}
.more-price p:last-child {
  text-decoration: line-through;
  color:#7b7f82
}
</style>