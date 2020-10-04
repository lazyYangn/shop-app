<template>
  <div>
    <TopBar @focusFunc="goto('search')">
      <div slot="right" class="iconfont icon-gouwuchezhengpin" @click="goto('cart')"></div>
    </TopBar>
    <MyContent :refreshFunc="refresh" pull>
      <a-carousel :after-change="onChange">
        <div v-for="(item, index) in homeImgs" :style="imgStyle(item)" :key="item">
          <h3>{{ index + 1 }}</h3>
        </div>
      </a-carousel>
      <div v-for="item in categorys" :key="item.id">
        <div class="title">
          <div class="title-left">{{ item.name }}</div>
          <div class="title-right" @click="goCategory('goodscategory', { content: item.id })">
            查看全部
          </div>
        </div>
        <div class="product-card-list">
          <ProductCard style="flex-shrink: 0; margin-right: 12px" v-for="item1 in item.goods" :product="item1" :key="item1.id"></ProductCard>
        </div>
      </div>
      <div class="title">
        <div class="title-left">类别</div>
        <div class="title-right">查看全部</div>
      </div>
      <div class="wrapper" ref="wrapper">
        <ul class="list" ref="list">
          <div v-for="(item, index) in moreContent" :key="item + index" class="more-content" :style="MoreContent(item)">
            <div style="opacity: 0.6">{{ item.name }}</div>
          </div>
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

let moreContent = [
  {
    name: '爆款',
    backgroundColor: '#F9BEAD',
    fontColor: '#D84933',
  },
  {
    name: '特价',
    backgroundColor: '#FBD96D',
    fontColor: '#B68700',
  },
  {
    name: '二手',
    backgroundColor: '#DFF8EA',
    fontColor: '#07A565',
  },
  {
    name: '拼一拼',
    backgroundColor: '#B1EAFD',
    fontColor: '#155162',
  },
]

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
      moreContent,
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
    MoreContent() {
      return (obj) => {
        return {
          backgroundColor: obj.backgroundColor,
          color: obj.fontColor,
        }
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
    goCategory(name, params) {
      this.$store.state.type = params.content
      this.$router.push({ name })
    },
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
                                    type{
                                      id
                                    }
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
        return true
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
        return false
      }
    },
    refresh() {
      return this.initData()
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
  touch-action: none;
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
.more-content {
  flex-shrink: 0;
  margin-right: 12px;
  width: 119px;
  height: 90px;
  border-radius: 15px;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>
