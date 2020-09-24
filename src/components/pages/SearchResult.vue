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
import { HttpGql, ImgUrl } from '@/kits/Http.js'

export default {
  name: 'SearchResult',
  data() {
    return {
      data: [],
      // searchContent: this.$route.params.content,
      searchContent: '',
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
    this.searchContent = this.$route.params.content
    this.search()
  },
  methods: {
    close() {
      this.$router.replace({ path: 'main/home' })
    },
    goSearch() {
      this.$router.push({ path: '/search' })
    },
    async search() {
      let pageCount = 5
      let p = {
        query: `{
          goods(count:${pageCount},name:"${this.searchContent}",desc:"${this.searchContent}"){
          id
          name
          price
          gooddesc
          imgpath
        }
        }`,
      }
      try {
        let res = await HttpGql(p)
        console.log(res)
        this.data = res.data.goods
        this.data.goods = res.data.goods.map((item) => {
          item.imgpath = ImgUrl + '/' + item.imgpath
        })
      } catch (error) {
        console.log(error)
      }
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
