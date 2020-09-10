<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="middle" style="font-weight:bold;font-size:16px">购物车</div>
    </TopBar>
    <MyContent style="padding-left:unset;padding-right:unset;padding:unset">
      <ProductItem v-for="(item, index) in $store.state.cartDate" :key="item.id" :index="index" :product="item"></ProductItem>
    </MyContent>
    <FooterBar>
      <div slot="left" style="flex:1">
        <div style="color:rgb(0 0 0 /0.5);font-size:12px;font-weight:bold">总价:</div>
        <div style="color:#FA6400;font-size:16px;font-weight:bold">{{ $store.getters.priceSum }}</div>
      </div>
      <FooterBarItem slot="right" name="购买" class="btn btn-right"></FooterBarItem>
    </FooterBar>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import FooterBar from '@/components/footer/FooterBar'
import FooterBarItem from '@/components/footer/FooterBarItem'
import MyContent from '@/components/content/MyContent'
import ProductItem from '@/components/product/ProductItem'
export default {
  name: 'Cart',
  data() {
    return {}
  },
  components: {
    TopBar,
    FooterBar,
    FooterBarItem,
    MyContent,
    ProductItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
  created() {
    if (this.$store.state.cartDate.length < 1) {
      let arr = [
        { id: 1, name: 'switch游戏主机', price: '1000', count: 1 },
        { id: 2, name: 'Mac', price: '2000', count: 1 },
        { id: 3, name: 'iphoneX', price: '3000', count: 1 },
        { id: 4, name: '华为手机', price: '4000', count: 1 },
      ]
      for (let item of arr) {
        this.$store.commit('pushCart', item)
      }
    }
  },
}
</script>

<style scoped>
.footer {
  background-color: #fff;
  box-shadow: 0px 0px 8px #e3e3e3;
}
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
