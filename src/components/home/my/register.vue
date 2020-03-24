<template>
  <div class="body-bg">
    <div class="top-box">
      <div class="top">
        <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
        <span>会员注册</span>
      </div>
    </div>
    <div class="login-box">
      <div class="login">
        <!-- <div class="login-item phone" >
          <img :src="src" alt="" @click="handleQR($event)" class="img">
          <input type="text" placeholder="请输入图文验证码" v-model="vcode">
        </div> -->

        <div class="login-item" >
          <input type="text" placeholder="请输入手机号码" v-model="cellphone">
        </div>
<!-- 
        <div class="login-item" style="position: relative">
          <input type="text" placeholder="请输入手机验证码" style="width: 60%" v-model="QRcode">
          <div class="QRcode">获取短信验证码</div>
        </div> -->

        <div class="login-item">
          <input :type="checked?'type':'password'" placeholder="请输入密码" v-model="password">
          <van-switch v-model="checked" size="24px" 
          class="switch" 
          active-color="#ee0a24" />
        </div>
        <div class="btn">
          <van-button type="danger" size="large" @click="register()">注册</van-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until.js'
import Vue from 'vue';
import { Switch,Button,Toast } from 'vant';
Vue.use(Switch);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      checked: true,
      src: '/api/vcode/chkcode?token=1ec949a15fb709370f',
      QRcode: '',
      cellphone: '',
      vcode: '',
      password: ''
    }
  },
  methods: {
    handleQR(e) {
      // 后代的参数清除缓存(获取验证码)
      e.target.src= '/api/vcode/chkcode?token=1ec949a15fb709370f&randow='+new Date().getTime()
    },
    // 注册
     register() {
      // 检测手机号是否正确
      if(this.cellphone =='' || !(/^1[3456789]\d{9}$/.test(this.cellphone))){
        Toast('请输入合法手机号')
      }
      else if(this.password =='' || (/[\u4e00-\u9fa5]/.test(this.password))) {
        Toast('请输入合法密码')
      }
      else {
         request(
          'api/home/user/reg?token=',
          'post',
          {cellphone: this.cellphone,password: this.password})
          .then(res => {
            if(res.data.code == 302) {
              Toast("此手机号已注册")
            }
            else if(res.data.code == 200) {
              Toast('恭喜，注册成功');
              this.$router.replace('/login')
            }

        })
      }
      
    }
  },
}
</script>

<style scoped>
  .body-bg{
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
    background-color: #fff;
    z-index: -1;
  }
  /* top */
  .top-box {
    box-sizing: border-box;
    padding-left: 0.18rem;
    background: #fff;
    border-bottom: 1px solid #efefef;
  }
  .top {
    box-sizing: border-box;
    display: flex;
    font-size: 0.5rem;
    line-height: 1rem;
    align-items: center;
  }
  .top span:nth-child(2) {
    font-size: 0.28rem;
    flex: 1;
    text-align: center;
    position: relative;
    right: 0.12rem;
  }
  .login-box {
    box-sizing: border-box;
    padding: 0.32rem;
  }
  .login {
    box-sizing: border-box;
  }
  .login-item {
    line-height: 0.8rem;
    width: 100%;
    box-sizing: border-box;
     margin-top: 0.24rem;
    height: 0.8rem;
  }
  .login-item input {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    box-sizing: border-box;
    border: 1px solid #efefef;
    padding-left: 0.2rem;
  }
  .login-item.phone {
    position: relative;
  }
  .login-item.phone input {
    width: 60%;
  }
  .img {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    }
  .QRcode {
    width: 30%;
    position: absolute;
    right: 0;
    top: 0;
    background: #eaeaea;
    color: #717376;
    font-size: 0.24rem;
    text-align: center;
  }
  .login .login-item:nth-child(2) {
   
    position: relative;
  }
  .login .login-item:nth-child(2) .switch {
    position: absolute;
    right: 0.24rem;
    top: 50%;
    transform: translateY(-50%);
    
  }
      /* btn */
  .btn {
    box-sizing: border-box;
    padding: 0.25rem 0.25rem;
  }

</style>