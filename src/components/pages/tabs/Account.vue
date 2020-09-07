<template>
  <div class="Acc">
    <div class="bell">
      <a-icon type="bell" />
    </div>
    <div class="avatarClass">
      <a-avatar :size="100" icon="user" />
    </div>
    <a-list class="menu" item-layout="horizontal" :data-source="menu">
      <a-list-item style="border:none" slot="renderItem" slot-scope="item">
        <div>{{ item.name }}</div>
        <a-icon type="right" />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const menu = [
  {
    name: '个人信息',
  },
  {
    name: '收货地址',
  },
  {
    name: '历史订单',
  },
  {
    name: '消息通知',
  },
  {
    name: '绑定卡片',
  },
  {
    name: '查看版本',
  },
  {
    name: '退出登录',
  },
]
export default {
  name: 'Account',
  data() {
    return {
      menu,
    }
  },
  components: {},
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
