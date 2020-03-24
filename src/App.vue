<template>
  <div>
    <!-- 默认首页需要缓存 -->
<!-- 
   <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
     
    }
  },
  components: {
  
  }
}
</script>

<style>
@import '../src/assets/font/iconfont.css';
@import '../src/assets/css/animate.min.css';
body {
  background: #EFEFEF;
}
body,h1,h2,h3,h4,h5,h6,p,ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div,ul,p,li {
  box-sizing: border-box;
}
body {
  font-size: 0.28rem;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
</style>