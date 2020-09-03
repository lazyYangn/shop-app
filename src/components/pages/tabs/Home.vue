<template>
  <div>
    <TopBar :focusFunc="search">
      <div slot="right" class="iconfont icon-gouwuchezhengpin" @click="goto('/cart')"></div>
    </TopBar>
    <div>this is home</div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
export default {
  name: 'Home',
  components: {
    TopBar,
  },
  methods: {
    goto(path) {
      this.$router.push({ path })
    },
    search() {
      this.$router.push({ path: '/search' })
    },
  },
}
</script>
<style scoped></style>
