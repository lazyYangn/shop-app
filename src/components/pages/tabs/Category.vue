<template>
  <MyContent>
    <div class="title">商品类别</div>
    <div class="card-list">
      <div class="card" v-for="item in categorys" :key="item.id" :style="cardStyle(item)" @click="gotoGoodsCategory(item.id)">
        <div :class="item.logo"></div>
        <div class="card-right" :style="cardRight(item)">{{ item.name }}</div>
      </div>
    </div>
  </MyContent>
</template>

<script>
import MyContent from '@/components/content/MyContent'
let categorys = [
  {
    id: '01',
    name: '游戏主机',
    backgroundColor: '#F9BEAD',
    fontColor: '#D84933',
    logo: 'iconfont icon-switch-line card-left',
  },
  {
    id: '02',
    name: '游戏大作',
    backgroundColor: '#FBD96D',
    fontColor: '#B68700',
    logo: 'iconfont icon-94 card-left',
  },
  {
    id: '03',
    name: '鞋类',
    backgroundColor: '#DFF8EA',
    fontColor: '#07A565',
    logo: 'iconfont icon-shoes card-left',
  },
  {
    id: '06',
    name: '潮服',
    backgroundColor: '#B1EAFD',
    fontColor: '#155162',
    logo: 'iconfont icon-yifu card-left',
  },
]
export default {
  name: 'Category',
  data() {
    return {
      categorys,
    }
  },
  components: {
    MyContent,
  },
  computed: {
    cardStyle() {
      return (obj) => {
        return { backgroundColor: obj.backgroundColor }
      }
    },
    cardRight() {
      return (obj) => {
        return { color: obj.fontColor }
      }
    },
  },
  methods: {
     gotoGoodsCategory(categoryId){
            this.$store.commit("setGoodCategory",categoryId)
            this.$router.push({name:"goodscategory"})
        },
  },
}
</script>

<style scoped>
.title {
  color: rgb(0 0 0 /0.5);
  font-size: 16px;
  font-weight: bold;
}
.card-list {
  margin-top: 28px;
}
.card {
  height: 113px;
  border-radius: 21px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 35px;
}
.card-left {
  font-size: 64px;
  opacity: 0.6;
}
.card-right {
  margin-left: 72px;
  font-size: 24px;
  font-weight: bold;
}
</style>
