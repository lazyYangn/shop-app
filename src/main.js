import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from './router'
import './antd'
import './assets/css/common.css'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   components: {
//     App,
//   },
//   template: '<App/>',
// })
