<template>
  <div class="body-bg">
    <div class="top-box">
      <div class="top">
        <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
        <span>会员登录</span>
      </div>
    </div>
    <div class="login-box">
      <div class="login">
        <div class="login-item">
          <input type="text"  placeholder="请填写手机号" v-model="cellphone">
        </div>
        <div class="login-item">
          <input :type="checked ? 'text':'password'"  placeholder="请填写密码" v-model="password">
          <van-switch v-model="checked" size="24px" class="switch" active-color="#ee0a24"/>
        </div>
        <div class="btn">
          <van-button type="danger" size="large" @click="login">登录</van-button>
        </div>
        <div class="forget">
          <ul>
            <li>
              <span class="icon iconfont icon-mimasuo"></span>
              <span>忘记密码</span>
            </li>
            <li @click="$router.push('/register')">
              <span class="icon iconfont icon-shouji01"></span>
              <span>快速注册</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Switch,Button,Toast } from 'vant';
import {request} from '../../../assets/js/until'
Vue.use(Switch);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      checked: true,
      cellphone: '',
      password: ''
    }
  },
  methods: {
    login() {
      if(this.cellphone == '') {
        Toast('手机号不能为空')
      }
      else if(!(/^1[3456789]\d{9}$/.test(this.cellphone))) {
        Toast('请输入合法手机号')
      }
      else if(this.password == '') {
        Toast('密码不能为空')
      }
      else {
        request(
        'api/home/user/pwdlogin?token=',
        'post',
        {cellphone: this.cellphone,password: this.password})
        .then(res => {
        
          if(res.data.code == 200) {
            Toast('登录成功');
            this.$router.go('-1');
            this.$store.commit('login',res.data.data);
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
  .login .login-item:nth-child(2) {
    margin-top: 0.24rem;
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
  /* forget */
  .forget {
    box-sizing: border-box;
    padding: 0 0.20rem
  }
  .forget ul {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }
  .forget ul li {
    flex: 1;
    box-sizing: border-box;
    font-size: 0.24rem;
  }
  .forget ul li:nth-child(2) {
    text-align: right;
  }
</style>