<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back1 arrow" @click="goBack"></div>
      <div slot="middle">
        <a-input size="large" />
      </div>
      <div slot="right" class="iconfont icon-search search" @click="search"></div>
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
      this.$router.go(-1)
    },
    search() {
      localStorage.getItem()
    },
  },
}
</script>

<style scoped>
.arrow .search {
  font-size: 20px;
}
</style>
