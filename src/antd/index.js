import Vue from 'vue'
import { Input, Icon, Button, message, List, Carousel, Avatar, Skeleton, Form, FormModel, Checkbox, Modal } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(List)
Vue.use(Carousel)
Vue.use(Avatar)
Vue.use(Skeleton)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Checkbox)
Vue.use(Modal)

Vue.prototype.$message = message
message.config({
  top: `70px`,
  duration: 2,
  maxCount: 3,
})
