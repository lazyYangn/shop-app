<template>
  <div>
    <TopBar>
      <div slot="middle">
        <a-input ref="SearchInput" size="large" v-model="searchContent" @focus="goSearch">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div slot="right">
        <a-icon type="close" @click="close" />
      </div>
    </TopBar>
    <MyContent>
      <div style="color:rgb(0 0 0 /.5);font-size:15px;font-weight:bold">有{{ data.length }}个商品符合要求</div>
      <div class="goods-list">
        <a-list :grid="{ gutter: 16, column: 2 }" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <ProductCard :product="item"></ProductCard>
          </a-list-item>
        </a-list>
      </div>
    </MyContent>
  </div>
</template>

<script>
import MyContent from '@/components/content/MyContent'
import TopBar from '@/components/topbar/TopBar'
import ProductCard from '@/components/product/Product'

let data = [
  { name: 'MacBook', price: '￥ 20000' },
  { name: 'iponeX', price: '￥ 10000' },
  { name: '华为', price: '￥ 8000' },
  { name: 'oppo', price: '￥ 5000' },
  { name: 'vivo', price: '￥ 4000' },
  { name: '三星', price: '￥ 9000' },
  { name: '锤子', price: '￥ 20000' },
  { name: '荣耀', price: '￥ 10000' },
  { name: '360', price: '￥ 8000' },
  { name: '1加', price: '￥ 5000' },
  { name: '努比亚', price: '￥ 4000' },
  { name: '360', price: '￥ 9000' },
]
export default {
  name: 'SearchResult',
  data() {
    return {
      data,
      searchContent: this.$route.params.content,
    }
  },
  components: {
    TopBar,
    MyContent,
    ProductCard,
  },
  mounted() {
    this.data = this.data.filter((item) => {
      return item.name.includes(this.searchContent)
    })
  },
  methods: {
    close() {
      this.$router.go(-1)
    },
    goSearch() {
      this.$router.push({ path: '/search' })
    },
  },
}
</script>

<style scoped>
.arrow .search {
  font-size: 20px;
}
.goods-list {
  margin-top: 15px;
}
</style>
