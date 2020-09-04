<template>
  <div>
    <TopBar @focusFunc="goto">
      <div slot="right" class="iconfont icon-gouwuchezhengpin" @click="goto('/cart')"></div>
    </TopBar>
    <MyContent>
      <div>this is Home</div>
      <div class="product-card-list">
        <ProductCard style="flex-shrink: 0;margin-right:12px;" v-for="item in 6" :key="item" :product="productData"></ProductCard>
      </div>
    </MyContent>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import MyContent from '@/components/content/MyContent'
import ProductCard from '@/components/product/Product'

export default {
  name: 'Home',
  components: {
    TopBar,
    MyContent,
    ProductCard,
  },
  methods: {
    goto(path) {
      this.$router.push({ path })
    },
    // search(path) {
    //   this.$router.push({ path })
    // },
  },
  data() {
    return {
      productData: {
        name: 'Iphone x 64',
        price: '¥ 10000',
      },
    }
  },
}
</script>
<style scoped>
.product-card-list {
  display: flex;
  overflow-x: auto;
  margin-top: 16px;
}
::-webkit-scrollbar {
  display: none;
}
</style>
