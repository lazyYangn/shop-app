<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="middle" style="font-weight:bold;font-size:16px">购物车</div>
    </TopBar>
    this is Cart page
    <FooterBar>
      <div slot="left" style="flex:1">
        <div style="color:rgb(0 0 0 /0.5);font-size:12px;font-weight:bold">总价:</div>
        <div style="color:#FA6400;font-size:16px;font-weight:bold">￥ 10000</div>
      </div>
      <FooterBarItem slot="right" name="购买" class="btn btn-right"></FooterBarItem>
    </FooterBar>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import FooterBar from '@/components/footer/FooterBar'
import FooterBarItem from '@/components/footer/FooterBarItem'
export default {
  name: 'Cart',
  data() {
    return {}
  },
  components: {
    TopBar,
    FooterBar,
    FooterBarItem,
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
.btn {
  flex: 1;
  margin: 0 10px;
  padding: 0 8px;
  border-radius: 8px;
}
.btn-right {
  background-color: #d8d8d8;
}
</style>
