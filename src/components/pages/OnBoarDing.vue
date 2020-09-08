<template>
  <div>
    <div class="top">
      <div class="top-image"></div>
    </div>
    <a-carousel>
      <div>
        <h3>最新的产品</h3>
        <a-skeleton class="skeleton" />
      </div>
      <div>
        <h3>最低的价格</h3>
        <a-skeleton class="skeleton" />
      </div>
      <div>
        <h3>最快的物流</h3>
        <a-skeleton class="skeleton" />
      </div>
    </a-carousel>
    <FooterBar>
      <FooterBarItem name="登录" slot="left" class="btn" @funcHandler="goPath('/login')"></FooterBarItem>
      <FooterBarItem name="注册" slot="right" class="btn btn-right" @funcHandler="goPath('/register')"></FooterBarItem>
    </FooterBar>
  </div>
</template>

<script>
import FooterBar from '@/components/footer/FooterBar'
import FooterBarItem from '@/components/footer/FooterBarItem'
export default {
  name: 'OnBoarDing',
  data() {
    return {}
  },
  methods: {
    goPath(path) {
      this.$router.push({ path })
    },
  },
  components: {
    FooterBar,
    FooterBarItem,
  },
}
</script>

<style scoped>
.top {
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-image {
  width: 310px;
  height: 295px;
  border-radius: 10px;
  background-color: rgb(0 0 0 /0.1);
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  line-height: 50px;
  overflow: hidden;
  color: rgb(0 0 0 /0.5);
}
.skeleton {
  width: 90%;
  margin: 0 24px;
}
.btn {
  flex: 1;
  margin: 0 10px;
  padding: 0 8px;
  border-radius: 8px;
}
.btn-right {
  background-color: #d8d8d8;
}
</style>
