<template>
  <div style="box-sizing: border-box;padding-top: 1.2rem">
    <div v-html="context"></div>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until'
export default {
  data() {
    return {
      context: '',
      gid: ''
    }
  },
  created() {
    this.$store.commit('getCurrentIndex',1)
    this.gid = this.$router.currentRoute.query.gid
      // 请求商品详情
    request('api/home/goods/info?gid='+this.gid+'&type=details&token=').then(res => {
      if(res.data.code == 200) {
        this.context = res.data.data.bodys;
      }
    })
  },
}
</script>

<style>

</style>