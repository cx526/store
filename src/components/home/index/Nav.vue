<template>
<div class="nav-box">
  <div class="nav">
    <ul>
      <li v-for="item in navList" :key="item.cid" @click="handleClick(item.cid)">
        <img v-lazy="item.image" alt="" >
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleClick(cid) {
      this.$router.push('/classify/goods/cid='+cid)
    }
  },
}
</script>

<style scoped>
.nav-box {
  box-sizing: border-box;
  height: 1.6rem;
  margin-top: 0.2rem;
  background: #fff;
}
.nav {
  height: 100%;
  box-sizing: border-box;
}
.nav ul {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
.nav ul li {
  flex: 1;
  text-align: center;
}
.nav ul li img {
  width: 0.8rem;
  height: 0.8rem;
}
.nav ul li p {
  margin-top: 0.15rem;
  color: #7b7f82;
  font-size: 0.26rem;
}
</style>