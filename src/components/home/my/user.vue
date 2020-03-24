<template>
  <div class="body-bg">
    <div class="top">
      <span class="icon iconfont icon-left" @click="$router.go(-1)"></span>
      <div class="mian">个人资料</div>
    </div>
    <div class="user-list">
      <div class="user-item" style="position: relative">
        <div class="user-img">
          <span>头像</span>
          <input type="file" class="upload" @change="upload($event)">
          <img :src="this.imgUrl" alt="">
        </div>
      </div>
      <div class="user-item">
        <div class="user-img">
          <span>昵称</span>
          <input type="text" placeholder="请填写昵称" v-model="name">
        </div>
      </div>
      <div class="user-item">
        <div class="user-img">
          <span>性别</span>
          <div type="text" @click="show = true" >
            <span style="color:#ccc">{{sex}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- btn -->
    <div class="btn" >
      <van-button type="danger" size="large " @click="submit()">保存</van-button>
    </div>
    <!-- 弹出层 -->
    <van-popup
    v-model="show"
    position="bottom"
    >
    <div class="popup" 
    v-for="(item,index) in popupList" 
    :key="item.gender"
    @click="chooseSex(index)">
      {{item.sex}}
    </div>
    </van-popup>
  </div>
</template>

<script>
import { request } from '../../../assets/js/until'
import Vue from 'vue';
import { Popup,Button,Toast } from 'vant';
Vue.use(Popup);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      show: false, 
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=616391314,1357096614&fm=11&gp=0.jpg',
      name: '',
      sex: '请选择性别',
      popupList: [
        {
          sex: '男',
          gender: 1
        },
        {
          sex: '女',
          gender: 2
        },
        {
          sex: '取消',
          gender: ''
        },
      ],
      dataList: {},
      head: ''
    }
  },
  created() {
    // 获取会员信息
    request(
      'api/user/myinfo/userinfo/uid/'+this.$store.state.uid+'?token='
    ).then(res => {
      console.log(res);
      if(res.data.code == 200) {
        this.name = res.data.data.nickname;
        this.sex = res.data.data.gender ==1 ? '男': '女',
        this.imgUrl = res.data.data.head?res.data.data.head:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=616391314,1357096614&fm=11&gp=0.jpg'
        this.dataList = res.data.data;

      }
      
    })
  },
  methods: {
    // 选择性别
    chooseSex(index) {
      if(index != 2) {
        this.sex = this.popupList[index].sex;
        this.show = false
      }
      else {
        this.show = false
      }
    },
    // 上传图片
    upload(event) {
      if(event.target.files[0]) {
        request(
        'api/user/myinfo/formdatahead?token=',
        'file',
        {headfile: event.target.files[0]}
        ).then(res => {
          if(res.data.code == 200) {
            Toast('头像上传成功');
            this.imgUrl = 'http://vueshop.glbuys.com/userfiles/head/'+ res.data.data.msbox;
            this.head = res.data.data.msbox;
          }
        })
      }
      
    },
    // 保存
    submit() {
      console.log(this.head)
      if(this.name == '') {
        Toast('请输入昵称');
        return
      }
      else {
        request(
          'api/user/myinfo/updateuser?token=',
          'post',
          {
            uid: this.$store.state.uid,
            nickname: this.name,
            gender: this.sex == '男'? 1 : 2,
            head: this.head
          }
        ).then(res => {
          if(res.data.code == 200) {
            Toast('修改成功')
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
  .user-list {
    box-sizing: border-box;
    border-top: 1px solid #efefef;
  }
  .user-item {
    box-sizing: border-box;
    padding: 0 0.3rem;
    border-bottom: 1px solid #efefef;
  
    font-size: 0.24rem;
  }
  .user-img {
    line-height: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-img > span {
    flex: 1
  }
  .user-img > img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
  .user-img > input {
    height: 80%;
    box-sizing: border-box;
    border: none;
    outline: none;
    text-align: right;
    font-size: 0.24rem;
    color: #ccc;
  }
  .user-img .upload {
    position: absolute;
    top:50%;
    right: 0.3rem;
    font-size: 0;
    width: 0.8rem;
    height:0.8rem;
    transform:translateY(-50%);
    opacity: 0;
    z-index: 10;
  }
  .popup{
    line-height: 0.8rem;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    font-size: 0.26rem;
    text-align: center;
    color: #444;
  }
  .btn {
    box-sizing: border-box;
    padding: 0.4rem;
  }
</style>