<template>
<div style="padding-top: 1.2rem;background: #fff">
   <!-- 商品评价 -->
  <div class="appraise-box" ref="wrapper" :style="cssText">
    <div class="appraise">
      <div class="appraise-title">
        商品评价<span v-if="total.total">({{total.total}})</span>
      </div>
      <div class="appraise-list" v-if="content && content.length > 0">
        <div class="appraise-item"
        v-for="item in content"
        :key="item.times">
          <div class="appraise-user">
            <img :src="item.head" alt="">
            <span>{{item.nickname}}</span>
          </div>
          <div class="appraise-main">{{item.content}}</div>
          <div class="appraise-data">{{item.times}}</div>
        </div>
      </div>
      <div v-else class="none">暂无相关评论</div>
    </div>
  </div>
</div>
  
  
</template>

<script>
import { request } from '../../../assets/js/until.js'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      cssText: {
        height: ''
      },
      gid: '',
      content: '',
      total:'',
      page: 1,
      flag: true
    }
  },
  created() {
    this.$store.commit('getCurrentIndex',2)
    this.cssText.height =parseInt( window.innerHeight - 60) + 'px'
    this.gid = this.$router.currentRoute.query.gid
    // 请求评价(默认请求第一页)
    request('api/home/reviews/index?gid='+this.gid+'&page='+this.page+'&token=').then(res => {
      if(res.data.code == 200) {
        this.content = res.data.data
        this.total = res.data.pageinfo
      }
    });
  },
  methods: {

  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,
      {
        probeType:1,
        pullDownRefresh:{ threshold: 20 },
        pullUpLoad: { threshold: 20 }
      });
      this.scroll.on('pullingUp',() => {
        this.page +=1;
        if(this.flag) {
          this.flag = false;
          request('api/home/reviews/index?gid='+this.gid+'&page='+this.page+'&token=').then(res => {
            if(res.data.code == 200) {
              this.content = [...this.content,...res.data.data]
              this.scroll.finishPullUp();
              this.scroll.refresh()
              this.flag = true
            }
            else {
              this.flag = false
            }
          });
          
        }
      
      })
    })
  },
}
</script>

<style scoped>
/* 商品评价 */
  .appraise-box {
    box-sizing: border-box;
    padding: 0 0.20rem;
    background: #fff;
    overflow: hidden;
  }
  .appraise {
    box-sizing: border-box;
  }
  .appraise-title {
    line-height: 0.6rem;
    font-size: 0.28rem;
    color: #7b7f82;
  }
  .appraise-list {
    box-sizing: border-box;
  }
  .appraise-item {
    box-sizing: border-box;
    margin-top: 0.24rem;
  }
  .appraise-user {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .appraise-user img {
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.24rem;
    border-radius: 50%;
  }
  .appraise-user span {
    font-size: 0.28rem;
  }
  .appraise-main {
    box-sizing: border-box;
    margin-top: 0.24rem;
    font-size: 0.28rem;
  }
  .appraise-data {
    box-sizing: border-box;
    margin-top: 0.24rem;
    font-size: 0.28rem;
    color: #7b7f82;
    padding-bottom: 0.12rem;
  }
</style>