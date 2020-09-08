<template>
  <div class="Acc">
    <div class="bell">
      <a-icon type="bell" />
    </div>
    <div class="avatarClass">
      <a-avatar :size="100" icon="user" />
    </div>
    <a-list class="menu" item-layout="horizontal" :data-source="menu">
      <a-list-item @click="goto(item.path)" style="border:none" slot="renderItem" slot-scope="item">
        <div>{{ item.name }}</div>
        <a-icon type="right" />
      </a-list-item>
    </a-list>
    <a-modal title="提示" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
const menu = [
  {
    name: '个人信息',
    path: '/myself',
  },
  {
    name: '收货地址',
    path: '/address',
  },
  {
    name: '历史订单',
    path: '/dingdan',
  },
  {
    name: '消息通知',
    path: '/message',
  },
  {
    name: '绑定卡片',
    path: '/card',
  },
  {
    name: '查看版本',
    path: '/version',
  },
  {
    name: '退出登录',
    path: '/onboarding',
  },
]
export default {
  name: 'Account',
  data() {
    return {
      menu,
      ModalText: '你确定要退出登录吗',
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    goto(path) {
      if (path === '/onboarding') {
        this.visible = true
      } else {
        this.$router.push({ path })
      }
    },
    handleOk(e) {
      this.ModalText = '退出中...'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        this.$router.replace({ path: '/onboarding' })
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
  },
  components: {},
  created() {
    //异步的网络请求 目的是获取服务器传来的菜单 this.meun = res.data
  },
}
</script>

<style scoped>
.Acc {
  position: relative;
}
.bell {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 24px;
}
.avatarClass {
  height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  background-color: #fff;
  height: 100%;
  padding: 0 24px;
}
</style>
