import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from './router'
import './antd'
import './assets/css/common.css'
import store from './store'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   components: {
//     App,
//   },
//   template: '<App/>',
// })
