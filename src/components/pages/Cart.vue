<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="middle" style="font-weight:bold;font-size:16px">购物车</div>
    </TopBar>
    this is Cart page
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
export default {
  name: 'Cart',
  data() {
    return {}
  },
  components: {
    TopBar,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.arrow {
  font-size: 24px;
}
</style>
