/**
 * 全局变量控制
 * 优点:一旦在state这个属性里声明了 那么这个属性就可以在整个项目中任何地方(*.vue)使用
 * 注意:一旦页面刷新或者关闭浏览器甚至关机那么在state声明的属性的值就会清空
 */
import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  //同步修改
  mutations: {
    pushCart(state, item) {
      state.cartDate.push(item)
    },
    increaseCart(state, index) {
      if (state.cartDate[index].count < 99) {
        state.cartDate[index].count++
      } else {
        return
      }
    },
    decreaseCart(state, index) {
      if (state.cartDate[index].count <= 1) {
        return
      } else {
        state.cartDate[index].count--
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
  },
  //异步修改
  actions: {},
  getters: {
    priceSum(state) {
      let total = 0
      return '￥' + state.cartDate.reduce((pre, item) => pre + item.price * item.count, total)
    },
  },
})

export default store
