import Vue from 'vue'
import { Input, Icon, Button, message, List, Carousel, Avatar } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(List)
Vue.use(Carousel)
Vue.use(Avatar)

Vue.prototype.$message = message
message.config({
  top: `70px`,
  duration: 2,
  maxCount: 3,
})
