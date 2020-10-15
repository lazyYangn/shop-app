/**
 * 全局变量控制
 * 优点:一旦在state这个属性里声明了 那么这个属性就可以在整个项目中任何地方(*.vue)使用
 * 注意:一旦页面刷新或者关闭浏览器甚至关机那么在state声明的属性的值就会清空
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {Http,ImgUrl} from '@/kits/Http'
import {getCachVal} from '@/kits/LocalStorage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartDate: [],
    searchInput: '',
    type: '',
    selectGood: {
      id: '',
      type: '',
    },
    selectGoods: [],
    goodCategory:'',
    selectedOrder:{}
  },
  //同步修改
  mutations: {
    setGoodCategory(state,newVal){
      state.goodCategory = newVal
    },
    initCart(state,data){
      state.cartDate = data
    },
    pushCart(state, item) {
      let index = -1
     for (let i = 0; i < state.cartDate.length; i++) {
       if(state.cartDate[i].id == item.id){
         index = i
         break
       }
    }
    if(index > -1){
      // this.commit('increaseCart',index) 也可以
      store.commit('increaseCart',index)
    }else{
      state.cartDate.push(item)
    }
     },
    increaseCart(state, index) {
      if (state.cartDate[index].countbuy < 99) {
        state.cartDate[index].countbuy++
      } else {
        return
      }
    },
    decreaseCart(state, index) {
      if (state.cartDate[index].countbuy < 1) {
        return
      } else {
        state.cartDate[index].countbuy--
      }
    },
    setSearchInput(state, newVal) {
      state.searchInput = newVal
    },
    setType(state, newVal) {
      state.type = newVal
    },
    setSelectGood(state, item) {
      state.selectGood = item
    },
    addSelectGoods(state, item) {
      state.selectGoods.push(item)
    },
    popSelectGoods(state, item) {
      state.selectGoods.pop(item)
    },
    removeCart(state,index){
      if(state.cartDate[index].countbuy === 0){
          state.cartDate.splice(index,1)
      }
    },
    resetCart(state){
        state.cartData = []
    },
    setSelectedOrder(state,item){
      state.selectedOrder = item
    }
  },
  //异步修改
  actions: {
  pushCart(context,item){
    item.imgpath = ImgUrl + item.imgpath
      context.commit("pushCart",item)
      let cartitem = context.state.cartDate.filter((t)=>(t.id === item.id))
      doCart(item.id,cartitem.length >0 ? cartitem[0].countbuy : 0)
  },
  increaseCart(context,index){
    context.commit("increaseCart",index)
    let cartitem = context.state.cartDate[index]
    doCart(cartitem.id,cartitem.countbuy)
  },
  decreaseCart(context,index){
    context.commit("decreaseCart",index)
    let cartitem = context.state.cartDate[index]
    doCart(cartitem.id,cartitem.countbuy)
    context.commit("removeCart",index)
  },
  async order(context){
    console.log(getCachVal("userid"))
    const p = {
        userid:getCachVal("userid"),
        orderlist:context.state.cartDate
    }
    try {
        let res = await Http("/createorder",p)
        if (res.code === 1) {
            await Http("/resetcart",{
                userid:getCachVal("userid")
            })
            context.commit('resetCart')
            return res
        }
    } catch (e) {
        return e
    }
}
      
  },
  getters: {
    priceSum(state) {
      let total = 0
      return '￥' + state.cartDate.reduce((pre, item) => pre + item.price * item.countbuy, total)
    },
  },
})

const doCart = (goodid,num) => {
  Http("/goodaddcart",{
      userid:getCachVal("userid"),
      goodid,
      num,
  })
}


export default store
