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
    <MyContent :refreshFunc="refresh" pull>
      <div style="color: rgb(0 0 0 /0.5); font-size: 15px; font-weight: bold">有{{ data.length }}个商品符合要求</div>
      <div class="goods-list" v-infinite-scroll="handleInfiniteOnLoad" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
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
import { HttpGql, ImgUrl } from '@/kits/Http.js'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  directives: { infiniteScroll },
  name: 'SearchResult',
  data() {
    return {
      data: [],
      // searchContent: this.$route.params.content,
      searchContent: '',
      busy: false,
      start: 0,
    }
  },
  components: {
    TopBar,
    MyContent,
    ProductCard,
  },
  created() {
    //拿到上个页面的参数
    //进行搜索
    this.searchContent = this.$store.state.searchInput
    // this.search();
  },
  methods: {
    close() {
      this.$router.replace({ path: 'main/home' })
    },
    goSearch() {
      this.$router.push({ path: '/search' })
    },
    async search() {
      let pageCount = 8
      let p = {
        query: `{
          goods(start:${this.start},count:${pageCount},name:"${this.searchContent}",desc:"${this.searchContent}"){
          id
          name
          price
          gooddesc
          imgpath
          type{
            id
          }
        }
        }`,
      }
      try {
        let res = await HttpGql(p)
        this.data = this.data.concat(
          res.data.goods.map((item) => {
            item.imgpath = ImgUrl + '/' + item.imgpath
            return item
          })
        )
        this.start += pageCount
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    refresh() {
      this.data = []
      this.start = 0
      return this.search()
    },
    handleInfiniteOnLoad() {
      this.search()
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
