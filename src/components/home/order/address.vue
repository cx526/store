<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">选择收货地址</div>
    </div>
    <!-- 添加地址 -->
    <div class="add-box">
      <div class="add">
        <span>配送地址</span>
        <span @click="$router.push('/address/add')">+添加收货地址</span>
      </div>
    </div>
    <!-- 地址列表 -->
    <div class="address-list">
      <div class="address-item" 
      v-for="(item,index) in addressList"
      :key="item.aid"
      >
        <div class="user-info" @click="chooseAddress(item.aid)">
          <span>{{item.name}}</span>
          <span>{{item.cellphone}}</span>
        </div>
        <div class="address-detail">
          <van-checkbox 
          v-if="item.isdefault"
          v-model="item.isdefault" style=" margin-right: 0.2rem;">
          </van-checkbox>
          <span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
        </div>
        <div class="address-edit">
          <span @click="mode(item.aid)">编辑</span>
          <span class="icon iconfont icon-laji" @click="del(item.aid,index)"></span>
        </div>
      </div>
    </div>
    <div v-if="addressList==''" class="none">
      <span>您还没有添加收货地址！</span>
    </div>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until'
import Vue from 'vue'
import { Checkbox,Dialog,Toast } from 'vant'
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Toast);
export default {
  data() {
    return {
      // 存储收获地址
      addressList: []
    }
  },
  created() {
    // 判断用户是否有权限访问
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
    // 获取用户的收获地址列表
    request(
      'api/user/address/index?uid='+this.$store.state.uid+'&token=1ec949a15fb709370f'
    ).then(res => {
      if(res.data.code == 200) {
        for(let i = 0;i < res.data.data.length;i++) {
          res.data.data[i].isdefault = parseInt(res.data.data[i].isdefault);
        };
        this.addressList = res.data.data
        // this.$store.commit('saveAddress',this.addressList)
      
      }
    })
  },
  methods: {
    // 选择地址
    chooseAddress(aid) {
      // this.$store.commit('defaultAddres',this.addressList[index]);
      this.$router.push('/order?aid='+aid);
    },
    // 编辑地址
    mode(aid) {
      this.$router.push('/address/mod?aid='+aid)
    },
    // 删除
    del(aid,index) {
      Dialog.confirm({
        title: '',
        message: '确定是否删除'
      })
      .then(() => {
        request(
          'api/user/address/del?uid='+this.$store.state.uid+'&aid='+aid+'&token=1ec949a15fb709370f'
        ).then(res => {
          if(res.data.code == 200) {
            this.addressList.splice(index, 1);
            Toast('删除成功')
          }
        })
      })
    .catch(() => {
      });
   
    }
  },

}
</script>

<style scoped>
  .none {
    text-align: center;
  }
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
  /* 头部 */
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
  /* 添加收获地址 */
  .add-box {
    box-sizing: border-box;
    line-height: 0.8rem;
    padding: 0 0.16rem;
    background: #d3c6be;
  }
  .add {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
  }
  .add span:nth-child(2) {
    text-align: right;
  }
  /* 地址列表 */
  .address-list {
    box-sizing: border-box;
    margin-top: 0.4rem;
  }
  .address-item {
    box-sizing: border-box;
    margin-bottom: 0.2rem;
  }
  .user-info {
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
  }
  .address-detail {
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 0.6rem;
    border: 1px solid #E5E5E5;
    display: flex;
    align-items: center;
   
  }
  .address-edit {
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 0.6rem;
    text-align: right;
    border-bottom: 1px solid #E5E5E5;
  }
  
  .address-edit span:nth-child(1) {
    margin-right: 0.2rem;
  }
  .address-edit span:nth-child(2) {
    margin-left: 0.2rem;
  }
</style>