<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="right" class="iconfont icon-search search"></div>
    </TopBar>
    this is search
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
export default {
  name: 'Search',
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
.arrow .search {
  font-size: 24px;
}
</style>
