<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">修改密码</div>
    </div>
    <div class="check-box">
      <div class="check">
        <input :type="checked? 'type':'password'" placeholder="请输入不小于6位的密码" v-model="pwd">
        <van-switch v-model="checked" active-color="#ee0a24"/>
      </div>
    </div>
       <!-- btn -->
    <div class="btn">
      <van-button type="danger" size="large " @click="save()">保存</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { request } from '../../../assets/js/until'
import { Switch,Button, Toast } from 'vant';
Vue.use(Switch);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      checked: true,
      pwd: ''
    }
  },
  created() {

  },
  methods: {
    save() {
      if(this.pwd == '') {
        Toast('密码不能为空')
      }
      else {
        // 修改密码
        request(
          'api/home/user/modpwd?token=',
          'post',
          {uid: this.$store.state.uid,pwd: this.pwd}
        ).then(res => {
          if(res.data.code == 200) {
            Toast('修改成功');
            this.$router.go(-1)
          }
        })
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
  .check-box {
    box-sizing: border-box;
    padding: 0.25rem;
  }
  .check {
    width: 100%;
    height: 1rem;
    box-sizing: border-box;
    border: 1px solid #efefef;
    border-radius: 0.12rem;
    display: flex;
    align-items: center;
    padding: 0 0.12rem;
  }
  .check input {
    box-sizing: border-box;
    border: none;
    outline: none;
    height: 80%;
    flex: 1;
  }
  .btn {
    box-sizing: border-box;
    padding: 0.4rem;
  }
</style>