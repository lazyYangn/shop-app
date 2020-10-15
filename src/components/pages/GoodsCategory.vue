<template>
  <div>
    <TopBar @focusFunc="searchInputChange">
      <div @click="back" slot="left" class="iconfont icon-back1" style="font-size: 24px"></div>
    </TopBar>
    <MyContent :refreshFunc="refresh" pull>
      <div>这是搜索结果</div>
      <div v-infinite-scroll="handleInfiniteOnLoad" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
        <a-list :grid="{ gutter: 16, column: 2 }" :data-source="goods" style="margin-top: 16px">
          <a-list-item slot="renderItem" slot-scope="item">
            <ProductCard :product="item"></ProductCard>
          </a-list-item>
        </a-list>
      </div>
    </MyContent>
  </div>
</template>
<script>
import TopBar from '@/components/topbar/TopBar'
import MyContent from '@/components/content/MyContent'
import ProductCard from '@/components/product/Product'
import { HttpGql, ImgUrl } from '@/kits/Http'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  directives: { infiniteScroll },
  name: 'GoodsCategory',
  data() {
    return {
      searchInput: '',
      goods: [],
      type: '',
      start: 0,
      busy: false,
    }
  },
  components: {
    TopBar,
    MyContent,
    ProductCard,
  },
  created() {
    this.type = this.$store.state.goodCategory
    // this.searchData()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async searchData() {
      let count = 8
      let p = {
        query: `
        {
          goods(start:${this.start},count:${count},type:"${this.type}",name:"${this.searchInput}"){
            id
            name
            price
            imgpath
            type{
              id
            }
          }
        }
        `,
      }
      try {
        let res = await HttpGql(p)
        this.goods = this.goods.concat(
          res.data.goods.map((item) => {
            item.imgpath = ImgUrl + item.imgpath
            return item
          })
        )
        this.start += count
        return true
      } catch (error) {
        return false
      }
    },
    search() {
      if (this.searchInput !== '') {
        this.goods = []
        this.start = 0
        this.searchData()
      } else {
        this.$message.info('请输入要查询的东西')
      }
    },
    searchInputChange(path) {
      this.$router.replace({ path })
    },
    refresh() {
      this.data = []
      this.start = 0
      return this.searchData()
    },
    handleInfiniteOnLoad() {
      this.searchData()
    },
  },
}
</script>

<style scoped></style>
