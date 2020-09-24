<template>
  <div>
    <TopBar @focusFunc="goto('search')">
      <div slot="right" class="iconfont icon-gouwuchezhengpin" @click="goto('cart')"></div>
    </TopBar>
    <MyContent>
      <a-carousel :after-change="onChange">
        <div v-for="(item, index) in homeImgs" :style="imgStyle(item)" :key="item">
          <h3>{{ index + 1 }}</h3>
        </div>
      </a-carousel>
      <div v-for="item in categorys" :key="item.id">
        <div class="title">
          <div class="title-left">{{ item.name }}</div>
          <div class="title-right" @click="goto('goodscategory', { content: item.id })">查看全部</div>
        </div>
        <div class="product-card-list">
          <ProductCard style="flex-shrink: 0;margin-right:12px;" v-for="item1 in item.goods" :product="item1" :key="item1.id"></ProductCard>
        </div>
      </div>
      <div class="title">
        <div class="title-left">类别</div>
        <div class="title-right">查看全部</div>
      </div>
      <div class="wrapper" ref="wrapper">
        <ul class="list" ref="list">
          <div v-for="item in 5" :key="item" style="flex-shrink: 0;margin-right: 12px;width:119px;height:90px;border-radius:15px;background-color:#E5E5E5"></div>
        </ul>
      </div>
    </MyContent>
  </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import MyContent from '@/components/content/MyContent'
import ProductCard from '@/components/product/Product'
import BScroll from 'better-scroll'
import { HttpGql, ImgUrl } from '@/kits/Http'
export default {
  name: 'Home',
  components: {
    TopBar,
    MyContent,
    ProductCard,
    BScroll,
  },
  data() {
    return {
      categorys: [],
      homeImgs: [],
    }
  },
  created() {
    this.initData()
  },
  computed: {
    imgStyle() {
      return (url) => {
        return url && url !== ''
          ? {
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
            }
          : ''
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 使用 this.$nextTick 为了确保组件已经渲染完毕
      let itemWidth = 138 // 这里是设置列表每一项的宽度
      let margin = 0
      // width是整个列表的宽度
      let width = (itemWidth + margin) * 5 - margin
      // console.log(width)
      this.$refs.list.style.width = width + 'px' // 设置.list的宽度的宽度
      this.$nextTick(() => {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.wrapper, {
            scrollX: true,
            eventPassthrough: 'vertical', // 忽略竖直方向的滚动
          })
        } else {
          this.picScroll.refresh()
        }
      })
    })
  },
  methods: {
    goto(name, params) {
      params
        ? this.$router.push({
            name,
            params,
          })
        : this.$router.push({ name })
    },
    onChange(a, b, c) {
      // console.log(a, b, c)
    },
    async initData() {
      let t = '["03","06"]'
      let gql = {
        query: `
                        {
                            homeImgs
                            categorys(type:${t}) {
                                id
                                dictid
                                name
                                goods(count:5){
                                    id
                                    name
                                    price
                                    imgpath
                                }
                            }
                        }
                    `,
      }
      try {
        let res = await HttpGql(gql)
        for (let c of res.data.categorys) {
          c.goods = c.goods.map((item) => {
            item.imgpath = ImgUrl + item.imgpath
            return item
          })
        }
        this.categorys = res.data.categorys
        this.homeImgs = res.data.homeImgs
      } catch (error) {
        let goods = []
        for (let item of [1, 2, 3, 4, 5]) {
          goods.push({
            id: item,
            name: '产品名称',
            price: 0,
          })
          this.homeImgs.push('')
        }
        this.categorys.push({
          name: '商品类别',
          goods,
        })
      }
    },
  },
}
</script>
<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #e5e5e5;
  overflow: hidden;
  border-radius: 15px;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.product-card-list {
  display: flex;
  overflow-x: auto;
  margin-top: 16px;
}
::-webkit-scrollbar {
  display: none;
}
.wrapper {
  overflow: hidden;
  white-space: nowrap; /*当子元素超过父元素宽度的时候，不会折行*/
  margin-left: 24px;
  margin-top: 12px;
}

.wrapper .list {
  display: flex;
  padding: 0px;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: 20px;
  line-height: 20px;
}
.title-left {
  font-size: 14px;
}
.title-right {
  font-size: 12px;
  color: #b620e0;
}
</style>
