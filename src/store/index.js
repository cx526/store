import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../assets/js/until'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储最近搜索数据到浏览器上
    nearSearchList: localStorage['nearSearchList'] ? JSON.parse(localStorage['nearSearchList']): [],
    // 存储搜索商品关键词
    keywords: localStorage['keywords'] ? JSON.parse(localStorage['keywords']) : '',
    // 存储搜索结果
    resultList: localStorage['resultList'] ? JSON.parse(localStorage['resultList']) : [],
    // 存储商品的gid
    gid: localStorage['gid'] ? JSON.parse(localStorage['gid']): '',
    currentIndex: 0,
    attrs: [
      {"attrid":"1006","title":"颜色","values":[{"vid":"854","value":"红色"},{"vid":"855","value":"白色"}]},
      {"attrid":"1007","title":"尺寸","values":[{"vid":"857","value":"36"},{"vid":"858","value":"72"}]}
    ],
    cartData:localStorage['cartData']?JSON.parse(localStorage['cartData']): [],
    // 全选
    allChecked: localStorage['allChecked']?JSON.parse(localStorage['allChecked']): true,
    // 登录数据
    uid: localStorage['uid']?JSON.parse(localStorage['uid']): '',
    nickname:  localStorage['nickname']?JSON.parse( localStorage['nickname']):'',
    auth_token: localStorage['auth_token']?JSON.parse(localStorage['auth_token']):'',
    utype: localStorage['utype']?JSON.parse(localStorage['utype']):'',
    // 储存默认收货地址
    defaultAddres:localStorage['defaultAddres']?JSON.parse(localStorage['defaultAddres']): {}
  },
  mutations: {
    // 存储最新搜索到浏览器缓存
    handleNearSearch(state,payload) {
      state.nearSearchList = payload.nearSearchList;
      localStorage['nearSearchList'] = JSON.stringify(state.nearSearchList);
    },
    // 清除最新搜索
    clearNearSearch(state) {
      state.nearSearchList = [];
      localStorage.removeItem('nearSearchList')
    },
    // 点击热门搜索
    goSearch(state,payload) {
      state.nearSearchList.unshift(payload.title);
      localStorage['nearSearchList'] = JSON.stringify(state.nearSearchList);
    },
    // 获取搜索关键词/搜索结果
    getKeywords(state,payload) {
      state.keywords = payload.keywords;
      state.resultList = payload.resultList;
      localStorage['resultList'] = JSON.stringify(payload.resultList);
      localStorage['keywords'] = JSON.stringify(payload.keywords)
    },
    // 储存商品的gid
    getGid(state,payload) {
      state.gid = payload;
      localStorage['gid'] = JSON.stringify(payload)
    },
    // 储存当前的索引
    getCurrentIndex(state,payload) {
      state.currentIndex = payload
    },
    // 商品参数
    getParams(state,payload) {
      state.attrs = payload.attrs
    },
    handleParams(state,payload) {
      let index = payload.index;
      let index1 = payload.index1;
      if(state.attrs.length > 0) {
        for(let i = 0;i < state.attrs[index].values.length;i++) {
          if( state.attrs[index].values[i].active) {
            state.attrs[payload.index].values[i].active=false;
          }
        }
        
      }
      state.attrs[index].values[index1].active = true
    },
    // 添加进购物车
    addCart(state,payload) {
      console.log(payload)
      let flag = true;
     if(state.cartData.length > 0&& state.cartData != '') {
      
      for(let i = 0;i < state.cartData.length;i++) {
        // 当产品跟规格完成一样时则不加入
        if(JSON.stringify(state.cartData[i].attrs) == JSON.stringify(payload.cartData.attrs) && state.cartData[i].gid == payload.cartData.gid) {
          flag = false
          // 但数量要加；
          state.cartData[i].amount =  state.cartData[i].amount + payload.cartData.amount
          break;
        }
      }
     
     }
     if(flag) {
      state.cartData.push(payload.cartData);
     }
     localStorage['cartData'] = JSON.stringify(state.cartData)
      
    },
    // 删除购物车商品
    delCartData(state,payload) {
      state.cartData.splice(payload.index,1);
      localStorage['cartData'] = JSON.stringify(state.cartData);
    },
    // 填写购物车商品数量
    goodsNumber(state,payload) {
      state.cartData[payload.index].amount = payload.amount.replace(/[^\d]/g,'');
      if(!state.cartData[payload.index].amount) {
        state.cartData[payload.index].amount = 1
      }
      localStorage['cartData'] = JSON.stringify(state.cartData)
    },
    // 增加购物车商品数量
    incrementGoods(state,payload) {
      state.cartData[payload.index].amount = state.cartData[payload.index].amount+1;
      localStorage['cartData'] = JSON.stringify(state.cartData)
    },
    decrementGoods(state,payload) {
      state.cartData[payload.index].amount = state.cartData[payload.index].amount-1 > 0?state.cartData[payload.index].amount-1: 1;
      localStorage['cartData'] = JSON.stringify(state.cartData)
    },
    // 勾选某一类商品
    changeChoose(state,payload) {
      state.cartData[payload.index].check = !state.cartData[payload.index].check;
      for(let i = 0;i < state.cartData.length;i++) {
        if(!state.cartData[i].check) {
          state.allChecked = false;
          localStorage['allChecked'] = JSON.stringify(state.allChecked);
          break
        }
        else {
          state.allChecked = true;
          localStorage['allChecked'] = JSON.stringify(state.allChecked)
        }
      }
      localStorage['cartData'] = JSON.stringify(state.cartData);
    },
    // 全选全不选
    changeChooseALL(state) {
      state.allChecked = !state.allChecked;
      // if(!state.allChecked) {
        for(let i = 0;i < state.cartData.length;i++) {
          state.cartData[i].check =  state.allChecked
        }
        localStorage['allChecked'] = JSON.stringify(state.allChecked);
        localStorage['cartData'] = JSON.stringify(state.cartData);
    },
    // 当删除购物车没有商品时取消全选
    changeAllChecked(state) {
      if(!state.cartData.length) {
        state.allChecked = false;
        localStorage['allChecked'] = JSON.stringify(state.allChecked)
      }
      else {
        for(let i = 0;i < state.cartData.length;i++) {
          if(!state.cartData[i].check) {
            state.allChecked  = false;
            localStorage['allChecked'] = JSON.stringify(state.allChecked);
            break;
          }
          else {
            state.allChecked = true;
            localStorage['allChecked'] = JSON.stringify(state.allChecked)
          }
        }
        
      }
    },
    // 登录
    login(state,payload) {
      console.log(payload)
      state.uid = payload.uid,
      state.nickname = payload.nickname,
      state.utype = payload.utype,
      state.auth_token = payload.auth_token,
      localStorage['uid'] = JSON.stringify(payload.uid),
      localStorage['nickname'] = JSON.stringify(payload.nickname),
      localStorage['utype'] = JSON.stringify(payload.utype),
      localStorage['auth_token'] = JSON.stringify(payload.auth_token)
    },
    // 安全退出
    saveOut(state) {
      // 清空个人信息
      state.uid = '';
      state.nickname = '';
      state.auth_tok = '';
      state.utype = '';
      state.nearSearchList = '';
      state.cartData = [],
      localStorage.removeItem('cartData');
      localStorage.removeItem('nearSearchList');
      localStorage.removeItem('uid');
      localStorage.removeItem('nickname');
      localStorage.removeItem('auth_tok');
      localStorage.removeItem('utype')
    },
    // 储存默认收货地址
    defaultAddres(state,payload) {
      state.defaultAddres = payload
      localStorage['defaultAddres'] = JSON.stringify(payload)
      // console.log(state.defaultAddres)
    },
    
  },
  actions: {
    getKeywords(conText,payload) {
      let productObj = {};
      productObj.keywords = payload.keywords
      // http://vueshop.glbuys.com/api/home/goods/search?kwords=%E8%BF%9E%E8%A1%A3%E8%A3%99&otype=all&token=1ec949a15fb709370f
      request('api/home/goods/search?kwords='+payload.keywords+'&otype=all&token=').then(res => {
        if(res.data.code == 200) {
          productObj.resultList = res.data.data
          conText.commit('getKeywords',productObj)
        }
        else {
          conText.commit('getKeywords',productObj)
        }
      })
    },
    // 获取商品规格
    getParams(conText,payload) {
      request('api/home/goods/info?gid='+payload+'&type=spec&token=').then(res => {
        let data = res.data.data;
        for(let i = 0;i < data.length;i++) {
          for(let j = 0;j < data[i].values.length;j++) {
            data[i].values[j].active = false
          }
        }
        conText.commit('getParams',{attrs: data})
      })
    },
   
  },
  getters: {
    // 计算总价格
    allPrice(state) {
      let total = 0
      if(state.cartData.length > 0) {
        for(let i = 0;i < state.cartData.length;i++) {
          if(state.cartData[i].check) {
            total =(total + (state.cartData[i].price * state.cartData[i].amount))
          }
         
        }
        return total
      }
      else {
        return 0
      }
    }
  },
  modules: {
  }
})
