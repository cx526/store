<template>
<div style="box-sizing:border-box;padding-bottom: 1.2rem;padding-top:1.2rem">
  <!-- swiper -->
  <swiper :swiperList="goodsInfo.images"></swiper>
  <!-- 产品属性 -->
  <div class="product-box">
    <div class="prodct">
      <div class="product-title">
        {{goodsInfo.title}}
      </div>
      <div class="product-price">￥{{goodsInfo.price}}</div>
      <div class="product-sales">
        <span>快递：{{goodsInfo.freight}}元</span>
        <span>月销量{{goodsInfo.sales}}件</span>
      </div>
    </div>
  </div>
  <!-- 商品评价 -->
  <div class="appraise-box">
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
  <!-- 查看更多按钮 -->
  <div class="check-more" @click="checkMore()" >
    <button :disabled=disabled>查看更多评论</button>
  </div>
  <!-- 固定底部 -->
  <div class="footer-box">
    <div @click="collect()">收藏</div>
    <div @click="handleCart()">加入购物车</div>
  </div>
  <!-- 加入购物车弹窗 -->
  <div class="mark" v-show="isCart"></div>
  <transition
  enter-active-class="animated slideInUp"
  leave-active-class="animated fadeOut">
  <div class="show-box animated" v-if="isCart" ref="showBox">
    
    <div class="show">
      <div class="show-title" ref="showTitle">
        <img :src="goodsInfo.images &&goodsInfo.images[0]" alt="" ref="showImg">
        <div class="show-info">
          <p>{{goodsInfo.title}}</p>
          <p class="price">
            <span style="color:#f00">￥{{goodsInfo.price}}</span>
            <span>商品编码：{{gid}}</span>
          </p>
        </div>
        
        <span class="icon iconfont icon-error" @click="closeCart()" v-if="isError"></span>
      </div>
      <div class="show-payload" 
      v-for="(item,index) in $store.state.attrs" :key="index"
      >
        <div class="payload-title"><span>{{item.title}}</span></div>
        <div class="payload-item"
        >
          <span
          :class="{'showActive': item1.active}"
          v-for="(item1,index1) in item.values" :key="index1"
          @click="changeStatus({index: index,index1: index1})"
          >
          {{item1.value}}
          </span>
        </div>
      </div>
      <!-- 购买数量 -->
      <div class="sales-number">
        <span>购买数量</span>
        <div>
          <span @click="decrement()">-</span>
          <input type="text" v-model="number" @input="changeNum($event)">
          <span @click="increment()">+</span>
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="btn" @click="handleAdd()">
        <button >确定</button>
      </div>
    </div>
  </div>
  </transition>
  
</div>
</template>



<script>
import Vue from 'vue'
import Swiper from '../index/Swiper'
import { Dialog,Toast } from 'vant';
import { request } from '../../../assets/js/until'
import TweenMax from '../../../assets/js/TweenMax.min.js'
Vue.use(Toast);
export default {
  data() {
    return {
      // 商品的id
      gid: '',
      // 商品数据
      goodsInfo: {},
      // 商品评价
      content: [],
      total: {},
      disabled: true,
      isCart: false,
      number: 1,
      isError: true
    }
  },
  components: {
    Swiper
  },
  created() {

    this.gid = this.$router.currentRoute.query.gid;
    this.$store.commit('getGid',this.gid);
    // 请求商品规格
    this.$store.dispatch('getParams',this.gid)
    // 请求商品详情
    request('api/home/goods/info?gid='+this.gid+'&type=details&token=').then(res => {
      if(res.data.code == 200) {
        this.goodsInfo = res.data.data;
      }
    })
    // 请求评价(默认请求第一页)
    request('api/home/reviews/index?gid='+this.gid+'&page=1&token=').then(res => {
      if(res.data.code == 200) {
        this.disabled = false
        this.content = res.data.data
        this.total = res.data.pageinfo
      }
    })
    
  },
  methods: {
    checkMore() {
      this.$router.replace('appraise?gid='+this.gid);
        this.$store.commit('getCurrentIndex',2)
    },
    handleCart() {
      this.isCart = true
    },
    closeCart() {
      this.isCart = false
    },
    // 做减法
    decrement() {
      if(this.number > 1) {
        this.number --
      }
      else {
        this.number = 1
      }
    },
    // 做加法
    increment() {
      this.number += 1
    },
    // 改变数量
    changeNum(e) {
      this.number=e.target.value;
      this.number=this.number.replace(/[^\d]/g,"");
      if(!this.number || this.number==="0"){
        this.number=1;
      } 
    },
    // 改变选中状态
    changeStatus(params) {
      this.$store.commit('handleParams',params)
    },
    // 点击确定
    handleAdd() {
      let data = this.$store.state.attrs;
      let isflag = false;
      for(let i = 0;i < data.length;i++) {
        isflag = false
        for(let j = 0; j < data[i].values.length;j++) {
          if(data[i].values[j].active) {
            isflag = true 
            break;
          }
        }
        if(!isflag) {
          Dialog.alert({
            title: '',
            message: `请选择${data[i].title}`,
          })
          break;
        }
      }
      if(isflag) {
        this.addCart()
      }
    },
    // 加入购物车动画
    addCart() {
      this.isError = false;
      let cloneImg = this.$refs.showImg.cloneNode(true);
      let showTitle = this.$refs.showTitle;
      showTitle.appendChild(cloneImg);
      cloneImg.style.cssText = "position: absolute;left: 0;top: 0";
      let cart = document.getElementById('cart');
       TweenMax.to
       (cloneImg, 2, {bezier:[{x:this.$refs.showImg.offsetLeft, y:0},
       {x:cart.offsetLeft, y:-(window.innerHeight - this.$refs.showBox.offsetHeight)}
       ],onComplete:()=>{
         cloneImg.remove();
         this.isError = true;
        //  创建d加入购物车订单
        let attrs = [];
        let params = []
        let storeAttrs = this.$store.state.attrs;
        for(let i = 0;i < storeAttrs.length;i++) {
          params=[];
          for(let j = 0;j < storeAttrs[i].values.length;j++) {
            if(storeAttrs[i].values[j].active) {
              params.push(
                {paramid: storeAttrs[i].values[j].vid,title: storeAttrs[i].values[j].value}
                )
            }
          }
          attrs.push({attrid: storeAttrs[i].attrid,title: storeAttrs[i].title,params:params})
        };
        let cartData = 
          {
            gid: this.goodsInfo.gid,
            title: this.goodsInfo.title,
            price: this.goodsInfo.price,
            img: this.goodsInfo.images[0],
            amount: this.number,
            check: true,
            freight: this.goodsInfo.freight,
            attrs: attrs
          }
        
        // 添加进购物车
        this.$store.commit('addCart',{cartData: cartData})

        }});
        TweenMax.to(cloneImg,0.2,{rotation:360,repeat:-1});
    },
    // 收藏
    collect() {
      request(
        'api/goods/fav?uid='+this.$store.state.uid+'&gid='+this.gid+'&token='
      ).then(res => {
        Toast('收藏成功')
      })
    }
  },
  
  
}
</script>

<style scoped>
/* 加入购物车弹窗 */
.showActive {
  background: gold !important;
  color: #fff;
  
}
.mark {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
  width: 100%;
  height: 100%;
}
.show-box {
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 110;
  width: 100%;
}
.show {
  box-sizing: border-box;
  padding: 0 0.15rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 0.2rem;
}
.show-title {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
}
.show-title img {
  width: 0.8rem;
  height: 0.8rem;
}
.show-title .icon-error {
  width: 0.4rem;
  height: 0.4rem;
}
.show-title .show-info {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.2rem;
}
.show-title .show-info .price {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
  .none {
    text-align: center;
    margin-top: 0.24rem;
  }
  .show-payload {
    box-sizing: border-box;
    padding-left: 0.2rem;
  }
  .payload-title {
    font-size: 0.32rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
  }
  .payload-item {
    box-sizing: border-box;
    font-size: 0.32rem;
  }
  .payload-item span {
    display: inline-block;
    background: #efefef;
    padding: 0.08rem;
    margin-right: 0.08rem;
  }
  .sales-number {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
  }
  .sales-number div span {
    font-size: 0.48rem;
    display: inline-block;
    margin-right: 0.2rem;
  }
   .sales-number div span:last-child {
     margin-right: 0;
     margin-left: 0.2rem;
   }
  .sales-number div input {
    width: 0.5rem;
    outline: none;
  }
  .btn {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.2rem;
    font-size: 0.28rem;
    text-align: center;
  }
  .btn button {
    background: #f00;
    width: 100%;
    height: 100%;
    outline: none;
    color: #Fff;
    border: none
  }
  /* 底部 */
  .footer-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    line-height: 1.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 0.32rem;
    color: #FFF;
    width: 100%;
    height: 1.2rem;
    z-index: 99;
  }
  .footer-box > div:first-child {
    background: #fcb40a;
    flex: 1;
    text-align: center;
  }
  .footer-box > div:last-child {
    background: #f00;
    flex: 1;
    text-align: center;
  }
  /* 查看更多按钮  */
  .check-more {
    box-sizing: border-box;
    padding: 0 30%;
    padding-top: 0.75rem;
    padding-bottom: 0.5rem;
    background: #fff;
  }
  .check-more button {
    width: 100%;
    background: #fff;
    border: 1px solid #f00;
    box-sizing: border-box;
    padding: 0.12rem 0.16rem;
    outline: none;
  }
  /* 商品评价 */
  .appraise-box {
    box-sizing: border-box;
    padding: 0 0.20rem;
    background: #fff;
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
  /* 产品属性 */
  .product-box {
    box-sizing: border-box;
    background: #fff;
    padding: 0.5rem 0.25rem;
    margin-bottom: 0.24rem;
  }
  .product {
    box-sizing: border-box;
  }
  .product-title {
    font-size: 0.28rem;
    margin-bottom: 0.18rem;
  }
  .product-price {
    font-size: 0.28rem;
    color: #f00;
    margin-bottom: 0.18rem;
  }
  .product-sales {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
   .product-sales span {
     font-size: 0.24rem;
     color: #969696
   }
 
</style>