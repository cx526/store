<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="goBack()"></span>
      <div class="mian">确认订单</div>
    </div>
    <!-- 收获地址 -->
    <div class="address-box" @click="$router.push('/address')">
      <div class="address">
        <div class="empty"></div>
        <div v-if="isShow">
          <span>您的收货地址为空,点击添加收货地址</span>
        </div>
        <div v-else>
          <div>
            <p>
              <span style="margin-right: 0.2rem">
                {{name}}
              </span>
              <span>{{cellphone}}</span>
            </p>
          </div>
          <p>
            {{province}}{{city}}{{area}}{{address}}
          </p>
        </div>
        <div class="icon iconfont icon-right"></div>
      </div>
    </div>
    <!-- 商品 -->
    <div class="cart-list" v-if="$store.state.cartData && $store.state.cartData.length > 0">
      <div class="cart-item" 
      v-for="(item,index) in $store.state.cartData"
      :key="index">
        <div class="cart-img">
          <div><img :src=item.img alt=""></div>
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
          </div>
        </div>
      </div>
    </div>
    <!-- 合计 -->
    <div class="total">
      <div>
        <span>商品总额</span>
        <span>￥{{$store.getters.allPrice}}</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <span>实际金额：￥{{$store.getters.allPrice}}</span>
      <van-button type="normal" size="danger"
       @click="submit()">
        提交订单
      </van-button>
    </div>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until'
import Vue from 'vue'
import { Button,Toast } from 'vant'
Vue.use(Button)
Vue.use(Toast)
export default {
  
  data() {
    return {
      defaultList: {},
      isShow: true,
      chooseAddress: {},
      name: '',
      cellphone: '',
      province: '',
      area: '',
      city: '',
      address: ''
    }
  },
  created() {
    // 判断权限
    request(
      'api/home/user/safe?token=',
      'post',
      {uid: this.$store.state.uid,auth_token: this.$store.state.auth_token}
      ).then(res => {
        if(res.data.code != 200) {
          this.$store.commit('saveOut');
          this.$router.push('/login')
        }
    });
    // 获取默认的收获地址
    request(
      'api/user/address/defaultAddress?uid='+this.$store.state.uid+'&token='
    ).then(res => {
      if(res.data.code == 200) {
        this.isShow = false
        this.defaultList = res.data.data;
      }
    });
    // 获取选中的地址
    setTimeout(() => {
    request(
      'api/user/address/info?uid='+this.$store.state.uid+'&aid='+this.$router.currentRoute.query.aid+'&token='
    ).then(res => {
        // 初始化页面显示的收获地址信息
        this.chooseAddress = res.data.data;
        this.name = this.chooseAddress.name ? this.chooseAddress.name:this.defaultList.name;
        this.cellphone = this.chooseAddress.cellphone ? this.chooseAddress.cellphone:this.defaultList.cellphone;
        this.province = this.chooseAddress.province ? this.chooseAddress.province:this.defaultList.province;
        this.city = this.chooseAddress.city ? this.chooseAddress.city:this.defaultList.city;
        this.area = this.chooseAddress.area ? this.chooseAddress.area:this.defaultList.area;
        this.address = this.chooseAddress.address ? this.chooseAddress.address:this.defaultList.address;
        if(res.data.code == 200) {
          this.isShow = false
        }
    });
    },300)

    

  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 提交
    submit() {
      if(this.isShow) {
        Toast('请选择收货地址')
      }
      else if(!this.$store.state.cartData.length > 0) {
        Toast('请选择商品')
      }
      else {
        Toast('提交订单成功')
      }
    }
  },


}
</script>

<style scoped>
  .body-bg{
    box-sizing: border-box;
    padding-bottom: 1rem;
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
    background-color: #fff;
    z-index: -1;
  }
  .top {
    box-sizing: border-box;
    line-height: 1rem;
    border: 1px solid #E5E5E5;
    padding-left: 0.24rem;
    padding-right: 0.44rem;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .top > span {
    font-size: 0.4rem;
  }
  .top .mian {
    display: inline-block;
    flex: 1;
  }
  /* 收获地址 */
  .address-box {
    box-sizing: border-box;
    margin-top: 0.24rem;
    padding: 0 0.2rem;
    /* line-height: 1.6rem; */
  }
  .address {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .address .empty {
    width: 0.5rem;
  }
  .address div:nth-child(2) {
    flex: 1;
  }
  .address .icon {
    font-size: 0.4rem;
  }
  /* 商品 */
  .cart-number .item input {
     width: 100%;
     border: none;
     outline: none;
     text-align: center;
     height: 65%;
   }
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
   /* 合计 */
   .total {
     box-sizing: border-box;
     padding: 0 0.2rem;
     font-size: 0.24rem;
   }
   .total  > div {
     box-sizing: border-box;
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   .total span {
     flex: 1
   }
   .total span:nth-child(1) {
     color: #787878;
   }
   .total span:nth-child(2) {
     color: #f00;
     text-align: right;
   }
   /* 底部 */
   .footer {
     box-sizing: border-box;
     line-height: 1rem;
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 1rem;
     text-align: right;
   }
   .footer span {
     margin-right: 0.18rem;
   }
</style>