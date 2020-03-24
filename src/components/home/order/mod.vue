<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">修改收货地址</div>
    </div>
    <!-- 收获信息填写 -->
    <div class="address-info">
      <div class="address-item">
        <span>收货人</span>
        <input type="text" placeholder="收货人姓名" v-model="name">
      </div>
       <div class="address-item">
        <span>联系方式</span>
        <input type="text" placeholder="联系人手机号" v-model="cellphone">
      </div>
       <div class="address-item" @click="isShow = true">
        <span>所在地区</span>
        <input type="text" placeholder="请选择收货地址" :value="chooseContext" disabled>
      </div>
       <div class="address-item">
        <span>详细地址</span>
        <input type="text" placeholder="街道详细地址" v-model="address">
      </div>
      <div class="address-item">
        <van-checkbox v-model="checked"></van-checkbox>
        <span style="margin-left: 0.2rem">默认地址</span>
      </div>
    </div>
    <!-- btn -->
    <div class="btn">
      <van-button type="info" size="large" @click="saveAddress()">保存</van-button>
    </div>
    <!-- 省市区弹窗 -->
    <van-popup
    v-model="isShow"
    position="bottom"
    >
     <van-area 
     :area-list="areaList"
     @confirm="clickConfirm"
     @cancel="clickCancel()"
     />
    </van-popup>
   
  </div>
</template>

<script>
import areaList from '../../../assets/js/area'
import { request } from '../../../assets/js/until'
import Vue from 'vue'
import { Button,Checkbox,Popup,Area,Toast } from 'vant'
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Toast);

export default {
  data() {
    return {
      // 地址参数
      aid: '',
      checked: 1,
      areaList: areaList,
      isShow: false,
      chooseContext: '',
      name: '',
      cellphone: '',
      province: '',
      city: '',
      area: '',
      address: '',
      isdefault: '',
      // 储存要修改的地址信息
      modAddress: {}
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
    // 读取收获地址的aid
    this.aid =this.$router.currentRoute.query.aid;
    // 读取当前地址的信息
    request(
      'api/user/address/info?uid='+this.$store.state.uid+'&aid='+this.aid+'&token='
    ).then(res => {
      if(res.data.code == 200) {
        this.modAddress = res.data.data;
        // console.log(this.modAddress);
        this.name = res.data.data.name;
        this.cellphone = res.data.data.cellphone;
        this.address = res.data.data.address;
        this.checked = parseInt(res.data.data.isdefault) ? true: false;
        this.chooseContext = res.data.data.province + res.data.data.city+ res.data.data.area
      }
    })
  },
  methods: {
    clickConfirm(e) {
        let areaArr = [];
        this.province = e[0].name;
        this.city = e[1].name;
        this.area = e[2].name;
        for(let i = 0;i < e.length;i++) {
          areaArr.push(e[i].name);
        };
        for(let i = 0;i < areaArr.length;i++) {
          for(let j = i+1;j < areaArr.length;j++) {
            if(areaArr[i] == areaArr[j]) {
              areaArr.splice(j,1)
            }
          }
        }
      
        this.chooseContext = areaArr.splice(",").join(' ');
        this.isShow = false
    },
    clickCancel() {
      this.isShow = false
    },
    saveAddress() {
      this.isdefault = this.checked?1:0;
      request(
        'api/user/address/mod?token=',
        'post',
        {
          aid: this.aid,
          uid: this.$store.state.uid,
          name: this.name,
          cellphone: this.cellphone,
          address: this.address,
          isdefault: this.isdefault,
          province: this.province || this.modAddress.province,
          city: this.city || this.modAddress.city,
          area: this.area || this.modAddress.area
        }
      ).then(res => {
        if(res.data.code == 200) {
          Toast('地址修改成功');
          this.$router.go(-1);
        }
      })
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
  /* 收货人信息 */
  .address-info {
    box-sizing: border-box;
  }
  .address-item {
    box-sizing: border-box;
    line-height: 0.8rem;
    padding: 0 0.4rem;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    height: 0.8rem;
    align-items: center;
  }
  .address-item > span {
    width: 18%;
    height: 80%;
  }
  .address-item > input {
    margin-left: 0.2rem;
    flex: 1;
    width: 100%;
    font-size: 0.28rem;
    border: none;
    outline: none;
    height: 80%;
  }
  .btn {
    box-sizing: border-box;
    padding: 0.4rem;
  }
</style>