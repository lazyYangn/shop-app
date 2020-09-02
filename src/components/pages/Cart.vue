<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="middle"></div>
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
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.arrow {
  font-size: 24px;
}
</style>
