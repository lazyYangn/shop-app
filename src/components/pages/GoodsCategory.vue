<template>
  <div>
    <TopBar @searchInputChangeHandle="searchInputChange">
      <div @click="back" slot="left" class="iconfont icon-back1" style="font-size: 24px"></div>
      <div @click="search" slot="right" class="iconfont icon-search" style="font-size: 24px"></div>
    </TopBar>
    <MyContent>
      <div>这是搜索结果</div>
      <a-list :grid="{ gutter: 16, column: 2 }" :data-source="goods" style="margin-top:16px">
        <a-list-item slot="renderItem" slot-scope="item">
          <ProductCard :product="item"></ProductCard>
        </a-list-item>
      </a-list>
    </MyContent>
  </div>
</template>
<script>
import TopBar from '@/components/topbar/TopBar'
import MyContent from '@/components/content/MyContent'
import ProductCard from '@/components/product/Product'
import { HttpGql, ImgUrl } from '@/kits/Http'
export default {
  name: 'GoodsCategory',
  data() {
    return {
      searchInput: '',
      goods: [],
      type: '',
    }
  },
  components: {
    TopBar,
    MyContent,
    ProductCard,
  },
  created() {
    this.type = this.$route.params.content
    this.searchData()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    searchData() {
      let p = {
        query: `
        {
          goods(count:5,type:"${this.type}",name:"${this.searchInput}"){
            id
            name
            price
            imgpath
          }
        }
        `,
      }
      HttpGql(p)
        .then((res) => {
          this.goods = res.data.goods.map((item) => {
            item.imgpath = ImgUrl + item.imgpath
            return item
          })
        })
        .catch((err) => {})
    },
    search() {
      if (this.searchInput !== '') {
        this.searchData()
      } else {
        this.$message.info('请输入要查询的东西')
      }
    },
    searchInputChange(content) {
      this.searchInput = content
    },
  },
}
</script>

<style scoped></style>
