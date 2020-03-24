<template>
  <div :style="cssText" ref="right">
    <div class="loading" v-if="loading"><img src="../../../assets/images/loading.gif" alt=""></div>
    <div class="main-list" v-if="flag">
          <div class="main-item"
           v-for="item in product"
           :key="item.cid"
           >
            <div class="main-title">{{item.title}}</div>
            <div class="main-context" v-if="item.goods">
              <ul>
                <li 
                v-for="list in item.goods"
                :key=list.gid
                @click="handleDetail(list.gid)">
                  <img :src="list.image" alt="">
                  <p>{{list.title}}</p>
                </li>
              </ul>
            </div>
            <div v-else class="none-goods">抱歉，暂无对应产品</div>
          </div>
          
    </div>
    <div class="none" v-else>暂无相关产品</div>
  </div>
</template>

<script>
import {request} from '../../../assets/js/until'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      cssText: {
       height: ''
      },
      flag: true,
      cid: '',
      product: [],
      loading: false
    }
  },
  created() {
    this.cssText.height = window.innerHeight - 50 + 'px';
    this.cid = this.$route.params.cid.split('=')[1];
      request('api/home/category/show?cid='+this.cid+'&token=').then(res => {
        if(res.data.code == 200) {
          this.product = res.data.data;
          this.flag = true
        }
        else {
          this.flag = false
        }  
      })
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.right,
      {
        // 分发原本被禁用的点击事件
        click: true
      });
    })
    
  },
  methods: {
     handleDetail(gid) {
      this.$router.push('/goods/detail/product?gid='+gid)
    }
  },
  beforeRouteUpdate(to,from,next) {
      this.loading = true
      this.cid = (to.params.cid.split('=')[1])
      request('api/home/category/show?cid='+this.cid+'&token=').then(res => {
        this.loading = false;
        if(res.data.code == 200) {
          this.product = res.data.data;
          this.flag = true
          next()
        }
        else {
          this.flag = false;
          next()
        }  
      })
  }

}
</script>

<style>
/* 加载图标 */
  .loading {
    width: 1rem;
    height: 1rem;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%,0)''
  }
  .loading>img {
    width: 1rem;
    height: 1rem;
  }
  .none-goods {
    text-align: center;
    padding:0.25rem 0;
  }

  .main-list {
    box-sizing: border-box;
    background: #fff;
  }
  .main-title {
    background: #EFEFEF;
    font-size: 0.28rem;
    line-height: 0.5rem;
  }
  .main-context {
    box-sizing: border-box;
    padding-top: 0.2rem;
  }
  .main-context ul {
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .main-context ul li {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 33.33%;
    padding: 0 0.1rem;
    margin-bottom: 0.16rem;
  }
  .main-context ul li img {
    width: 100%;
    height: 1.25rem;
    display: block;
  }
  .main-context ul li p {
    font-size: 0.24rem;
    text-align: center;
    color: #333;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .none {
    text-align: center;
    padding-top: 0.5rem;
  }
</style>