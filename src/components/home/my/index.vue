<template>
  <div style="box-sizing: border-box;padding-bottom: 1.2rem">
    <div class="top-box">
      <div class="top">
        <!-- <span class="icon iconfont icon-left"></span> -->
        <span>个人中心</span>
      </div>
    </div>
    <!-- user -->
    <div class="user-box">
      <div class="user">
        <div class="user-img">
          <img :src="userInfo.head?userInfo.head: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584714797552&di=d9f7666bbb658860132b0a8d75a7dd0f&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg'" alt="">
        </div>
        <div class="user-message">
          <div><span>昵称：{{userInfo.nickname?userInfo.nickname:'花和尚'}}</span></div>
          <div><span>积分：{{userInfo.points?userInfo.points: 0}}</span></div>
        </div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="order-box">
      <div class="order">
        <span>全部订单</span>
        <div>
          <span>查看全部订单</span>
          <span class="icon iconfont icon-right"></span>
        </div>
      </div>
    </div>
    <!-- nav -->
    <div class="nav-box">
      <div class="nav">
        <ul>
          <li>
            <div class="icon iconfont icon-daizhifu"></div>
            <span>待支付</span>
          </li>
          <li>
            <div class="icon iconfont icon-daishouhuo"></div>
            <span>待收货</span>
          </li>
          <li>
            <div class="icon iconfont icon-daipingjia"></div>
            <span>待评价</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- menu -->
    <div class="menu-box">
      <div class="menu">
        <ul>
          <li @click="$router.push('/my/user')">
            <span>个人资料</span>
            <span class="icon iconfont icon-right"></span>
          </li>
           <li @click="$router.push('/my/manage')">
            <span>收获地址</span>
            <span class="icon iconfont icon-right"></span>
          </li>
           <!-- <li>
            <span>绑定地址</span>
            <span class="icon iconfont icon-right"></span>
          </li> -->
           <li @click="$router.push('/my/modpwd')">
            <span>修改密码</span>
            <span class="icon iconfont icon-right"></span>
          </li>
           <li @click="$router.push('/my/collect')">
            <span>我的收藏</span>
            <span class="icon iconfont icon-right"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- btn -->
    <div class="btn">
      <van-button
      v-if="!$store.state.uid"
      type="danger" size="large"
      @click="$router.push('/login')"
       >登录/注册
      </van-button>
      <van-button v-else type="danger" size="large" @click="saveOut()">
        安全退出
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button,Dialog  } from 'vant';
import { request } from '../../../assets/js/until.js'
Vue.use(Button);
Vue.use(Dialog);
export default {
  data() {
    return {
     userInfo: {}
    }
  },
  created() {
    // 会员信息
    // console.log(this.$store.state.uid)
    request(
      '/api/user/myinfo/userinfo/uid/'+this.$store.state.uid+'?token=',
    ).then(res => {
      if(res.data.code == 200) {
        this.userInfo = res.data.data;
      }
    })
  },
  methods: {
    // 安全退出
    saveOut() {
    Dialog.confirm({
        title: '',
        message: '确认安全退出'
      }).then(() => {
         this.$store.commit('saveOut')
      }).catch(() => {
        // on cancel
      });
    }
  },
}
</script>

<style scoped>
 .top-box {
   box-sizing: border-box;
   padding-left: 0.24rem;
   line-height: 1rem;
   background: #fff;
 }
 .top {
   box-sizing: border-box;
   text-align: center;
   font-size: 0.28rem;
 }
 /* user */
 .user-box {
   box-sizing: border-box;
   height: 2.8rem;
   background: #e51b19;
 }
 .user {
   box-sizing: border-box;
   padding-left: 0.24rem;
   display: flex;
   align-items: center;
   position: relative;
   top: 50%;
   transform: translateY(-50%);
 }
 .user-img {
   width: 1.2rem;
   height: 1.2rem;
 }
 .user-img img {
   width: 100%;
   height: 100%;
   border-radius: 50%;
 }
 .user-message {
   box-sizing: border-box;
   margin-left: 0.24rem;
   color: #fff;
 }
 .user-message div:nth-child(2) {
   margin-top: 0.16rem;
 }
  /* 订单 */
  .order-box {
    box-sizing: border-box;
    padding: 0 0.18rem;
    background: #fff;
    border-bottom: 1px solid #E5E5E5;
  }
  .order {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    line-height: 0.8rem;
    align-items: center;
  }
  /* nav */
  .nav-box {
    box-sizing: border-box;
    padding:  0.36rem 0;
    background: #fff;
  }
  .nav {
    box-sizing: border-box;
  
  }
  .nav ul {
      width: 100%;
    display: flex;
    align-items: center;
  }
  .nav ul li {
    box-sizing: border-box;
    text-align: center;
    flex: 1;
    font-size: 0.24rem;
  }
  .nav ul li div {
    font-size: 0.50rem;
    margin-bottom: 0.08rem;
    color: #f00;
  }
  /* menu */
  .menu-box {
    box-sizing: border-box;
    margin-top: 0.24rem;
    background: #fff;
  }
  .menu ul {
    box-sizing: border-box;
  }
  .menu ul li {
    line-height: 0.8rem;
    box-sizing: border-box;
    padding: 0 0.25rem 0 0.75rem;
    font-size: 0.28rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
  }
  .menu ul li span:nth-child(1) {
    flex: 1;
  }
  /* btn */
  .btn {
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
  }
</style>