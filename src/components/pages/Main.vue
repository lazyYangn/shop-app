<template>
  <div>
    <router-view></router-view>
    <TabBar>
      <TabBarItem name="首页" path="/main/home">
        <div slot="icon">
          <div class="iconfont icon-home "></div>
        </div>
      </TabBarItem>
      <TabBarItem name="分类" path="/main/category">
        <div slot="icon">
          <div class="iconfont icon-product "></div>
        </div>
      </TabBarItem>
      <TabBarItem name="订单" path="/main/order">
        <div slot="icon">
          <div class="iconfont icon-orderselect "></div>
        </div>
      </TabBarItem>
      <TabBarItem name="我的" path="/main/account">
        <div slot="icon">
          <div class="iconfont icon-caidaniconwodehui "></div>
        </div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar.vue'
import TabBarItem from '@/components/tabbar/TabBarItem.vue'
export default {
  name: 'Main',
  data() {
    return {}
  },
  components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style scoped></style>
