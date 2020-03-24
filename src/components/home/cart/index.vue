<template>
  <div>
    <div class="top">
      <!-- <span class="icon iconfont icon-left" @click="$router.go(-1)"></span> -->
      <span>购物车</span>
    </div>
    <!-- 购物车列表 -->
    <div class="cart-list" v-if="$store.state.cartData && $store.state.cartData.length > 0">
      <div class="cart-item" 
      v-for="(item,index) in $store.state.cartData"
      :key="index">
        <div class="cart-checkbox">
           <van-checkbox  
           icon-size="0.26rem" 
           v-model="item.check"
           @click="handleChecked(index)">
           </van-checkbox>
        </div>
        <div class="cart-img">
          <div><img :src=item.img alt=""></div>
          <div>
            <van-button 
            @click="del(index)" 
            type="primary" size="mini"
            >
              删除
            </van-button>
          </div>
        </div>
        <div class="cart-info">
          <div class="cart-title">
            {{item.title}}
          </div>
          <div class="cart-params">
            <span v-for = "(list,index) in item.attrs" :key="index">{{list.title}}：
              <span v-for="(tItem,index) in list.params" :key="index">{{tItem.title}}</span>
            </span>
            <!-- <span>尺码：37</span> -->
          </div>
          <div class="cart-number">
            <span>￥{{item.price}}</span>
            <div class="list">
              <div class="item" @click="increment(index)">+</div>
              <div class="item"><input type="text" v-model="item.amount" @input="handleInput(index,$event)"></div>
              <div class="item" @click="decrement(index)">-</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom-box">
      <div class="bottom">
        <van-checkbox  
        icon-size="0.26rem" 
        v-model="$store.state.allChecked"
        @click="handleAllChecked()">
        </van-checkbox>
        <span>全选</span>
        <div class="total"><span>合计：{{$store.getters.allPrice}}元</span></div>
        <van-button type="normal" size="danger" 
        :disabled="$store.getters.allPrice <= 0"
        @click="handleTotal()">
        去结算
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { checkboxGroup, checkbox,Button } from 'vant'
import { request } from '../../../assets/js/until';
Vue.use(checkbox);
Vue.use(Button)
export default {
  data() {
    return {
      amount: 1,
      checked: true,
      allPrice: ''
    }
  },
  created() {
    this.$store.commit('changeAllChecked')
    request(
    'api/home/user/safe?token=',
    'post',
    {uid: this.$store.state.uid,auth_token: this.$store.state.auth_token}
    ).then(res => {
      if(res.data.code != 200) {
        this.$store.commit('saveOut');
        this.$router.push('/login')
      }
    })
  },
  methods: {
    // 删除
    del(index) {
      this.$store.commit('delCartData',{index: index});
          this.$store.commit('changeAllChecked')
       
      // this.$store.commit('changeChoose',{index: index})
    },
    // s商品表单
    handleInput(index,event) {
      this.$store.commit('goodsNumber',{index: index,amount: event.target.value})
    },
    // 增加
    increment(index) {
      this.$store.commit('incrementGoods',{index: index})
    },
     // 减少
    decrement(index) {
      this.$store.commit('decrementGoods',{index: index})
    },
    // 单选
    handleChecked(index) {
      this.$store.commit('changeChoose',{index,index})
    },
    // 全选
    handleAllChecked() {
      this.$store.commit('changeChooseALL')
    },
    // 去结算
    handleTotal() {
      request(
        'api/home/user/safe?token=',
        'post',
        {uid: this.$store.state.uid,auth_token: this.$store.state.auth_token}
        ).then(res => {
          if(res.data.code != 200) {
            this.$store.commit('saveOut');
            this.$router.push('/login')
          }
          else {
            this.$router.push('/order')
          }
        })
    }
  },
 
}
</script>

<style scoped>
/* 头部 */
  .top {
    box-sizing: border-box;
    line-height: 0.95rem;
    border-bottom: 1px solid #E5E5E5;
    background: #fff;
    display: flex;
    padding-left: 0.24rem;
    text-align: center;
  }
  .top span:nth-child(1) {
    flex: 1;
    
    font-size: 0.30rem;
  }
  /* 列表 */
  .cart-list {
    box-sizing: border-box;
   
  }
   .cart-item {
     box-sizing: border-box;
     background: #fff;
     padding: 0.2rem;
     display: flex;
     align-items: center;
   }
   .cart-checkbox,.cart-img,.cart-info {
     box-sizing: border-box;
   }
   .cart-img {
     margin-left: 0.16rem;
     margin-right: 0.16rem;
     text-align: center;
   }
   .cart-img > div:nth-child(1) {
     box-sizing: border-box;
     width: 1.2rem;
     height: 1.2rem;
     margin-bottom: 0.08rem;
     
   }
   .cart-img > div:nth-child(1) > img {
     width: 100%;
     height: 100%;
   }
   .cart-info {
     font-size: 0.24rem;
     color: #444;
   }
   .cart-params,.cart-number {
     margin-top: 0.08rem;
   }
   
   .cart-params span:nth-child(1) {
     margin-right: 0.12rem;
   }
   .cart-number {
     display: flex;
     box-sizing: border-box;
     align-items: center;
     justify-content: space-between;
   }
   .cart-number span:nth-child(1) {
     color: #f00;
   }
   .cart-number .list {
     box-sizing: border-box;
     display: flex;
   }
   .cart-number .item {
     width: 0.6rem;
     height: 0.4rem;
     box-sizing: border-box;
     border: 1px solid #444;
     text-align: center;
     font-size: 0.24rem;
     line-height: 0.4rem;
   }
    .cart-number .item:nth-child(2) {
      width: 0.8rem;
    }
   .cart-number .item input {
     width: 100%;
     border: none;
     outline: none;
     text-align: center;
     height: 65%;
   }
   /* 底部 */
   .bottom-box {
     position: fixed;
     left: 0;
     bottom: 1.2rem;
     width: 100%;
     height: 1rem;
     background: #fff;
   }
   .bottom {
     width: 100%;
     height: 100%;
     box-sizing: border-box;
     display: flex;
     align-items: center;
   }
   .bottom span:nth-child(1) {
     font-size: 0.24rem;
   }
   .bottom .total {
     flex: 1;
     font-size: 0.24rem;
     text-align: right;
   }
</style>