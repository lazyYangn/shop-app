<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back" style="font-size: 24px" @click="goBack"></div>
      <div slot="middle" style="text-align: center; font-size: 20px">
        商品详情
      </div>
    </TopBar>
    <MyContent>
      <a-carousel style="width: 100%">
        <div class="bg-div" :style="imgStyle">
          <a-icon class="bg-icon" type="heart" />
          <a-icon class="bg-icon" type="share-alt" />
        </div>
        <div><h3></h3></div>
        <div><h3></h3></div>
      </a-carousel>
      <div style="margin-top:30px;padding-left:5px">
        <div class="good-title">{{ product.name }} - {{ product.gooddesc }}</div>
        <div class="good-price">￥ {{ product.price }}</div>
        <div style="font-size:14px;color:rgb(0 0 0 /0.5);font-weight:bold;margin-top:38px">相近商品</div>
        <div class="related-goods">
          <Product class="related-goods-item" v-for="(item, index) in products" :key="index + item" :product="item"></Product>
        </div>
      </div>
      <div style="margin-top:30px;margin-bottom:30px;font-size:14px;color:rgb(0 0 0 / 0.5 )">评论</div>
      <a-skeleton :paragraph="{ rows: 3 }" avatar active />
      <a-skeleton :paragraph="{ rows: 3 }" avatar active />
    </MyContent>
    <FooterBar>
      <FooterBarItem slot="left" name="加入购物车" style="border: none; flex: 1" @funcHandler="addCarts"></FooterBarItem>
      <FooterBarItem slot="right" name="购买" style="border: none; background-color: #d8d8d8; flex: 1" @funcHandler="order"></FooterBarItem>
    </FooterBar>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import FooterBar from '@/components/footer/FooterBar'
import FooterBarItem from '@/components/footer/FooterBarItem'
import MyContent from '@/components/content/MyContent'
import Product from '@/components/product/Product'
import { Http, HttpGql, ImgUrl } from '@/kits/Http'
import { getCachVal } from '@/kits/LocalStorage'
export default {
  name: 'GoodDetail',
  data() {
    return {
      product: {},
      products: [],
    }
  },
  created() {
    this.initData()
    if (getCachVal('token') && getCachVal('token').length > 0) {
      this.visitedGood(getCachVal('userid'), this.$store.state.selectGoods[this.$store.state.selectGoods.length - 1].id)
    }
  },
  components: {
    TopBar,
    FooterBar,
    FooterBarItem,
    MyContent,
    Product,
  },
  computed: {
    imgStyle() {
      return this.product.imgpath
        ? {
            backgroundImage: `url(${ImgUrl + this.product.imgpath})`,
            backgroundSize: 'contain',
          }
        : ''
    },
  },
  watch: {
    $route(to, from) {
      this.initData()
      if (getCachVal('token') && getCachVal('token').length > 0) {
        this.visitedGood(getCachVal('userid'), this.$store.state.selectGoods[this.$store.state.selectGoods.length - 1].id)
      }
    },
  },
  methods: {
    goBack() {
      this.$store.commit('popSelectGoods')
      this.$router.go(-1)
    },
    addCarts() {
      console.log('加入购物车')
    },
    order() {
      console.log('order')
    },
    async initData() {
      const id = this.$store.state.selectGoods && this.$store.state.selectGoods.length > 0 ? this.$store.state.selectGoods[this.$store.state.selectGoods.length - 1].id : ''
      const type = this.$store.state.selectGoods && this.$store.state.selectGoods.length > 0 ? this.$store.state.selectGoods[this.$store.state.selectGoods.length - 1].type : ''
      const gql = {
        query: `
                    {
                        good (id:${id}){
                            id
                            name
                            gooddesc
                            price
                            imgpath
                            type {
                            id
                            name
                            }
                        }
                        goods (start:0,count:5,type:"${type}") {
                            id
                            name
                            price
                            imgpath
                            type {
                                id
                            }
                        }
                    }
                `,
      }
      let res = await HttpGql(gql)
      this.product = res.data.good
      this.products = res.data.goods
        .filter((item) => {
          return item.id != id
        })
        .map((item) => {
          item.imgpath = ImgUrl + item.imgpath
          return item
        })
    },
    visitedGood(userid, goodid) {
      Http('/visited', {
        userid,
        goodid,
      })
    },
  },
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  /* line-height: 160px; */
  background: rgb(0 0 0 /0.1);
  overflow: hidden;
  border-radius: 10px;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.bg-div {
  display: flex !important;
  justify-content: flex-end;
  height: 160px;
}
.bg-icon {
  margin-right: 16px;
  font-size: 20px;
  color: #8c8c8c;
  margin-top: 12px;
}
.good-title {
  font-size: 16px;
  font-weight: bold;
  color: rgb(0 0 0 /0.5);
}
.good-price {
  font-size: 18px;
  color: #fa5400;
  font-weight: bold;
  margin-top: 15px;
}
.related-goods {
  display: flex;
  overflow: hidden;
  margin-top: 16px;
  overflow-x: auto;
}
::-webkit-scrollbar {
  display: none;
}
.related-goods-item {
  flex-shrink: 0;
  margin-right: 12px;
}
</style>
