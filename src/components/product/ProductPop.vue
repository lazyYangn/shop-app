<template>
  <div class="pop-good-item" @click="goto">
    <div class="iconfont pop-good-left" :class="product.iconClass"></div>
    <div class="pop-good-middle">
      <div>{{ product.name }}</div>
      <div>{{ product.gooddesc }}</div>
    </div>
    <div class="pop-good-right" :style="imgStyle(product.imgpath)"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    product: Object,
  },
  computed: {
    imgStyle() {
      return (url) => {
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: "90px 70px",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        };
      };
    },
  },
  methods: {
    goto() {
      console.log(this.product);
      this.$store.commit("addSelectGoods", {
        id: this.product.id,
        type: this.product.type.id,
      });
      this.$router.push({ path: "/gooddetail/" + this.product.id });
    },
  },
};
</script>

<style scoped >
.pop-good-item {
  display: flex;
  height: 80px;
  align-items: flex-start;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 3px 1px 8px #e3e3e3;
  border-radius: 8px;
  align-items: center;
  padding: 10px;
}
.pop-good-left {
  padding: 10px 0;
  font-size: 25px;
  color: #ffe100;
  font-weight: bold;
  flex: 1;
}
.pop-good-middle {
  flex: 3;
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  justify-content: space-between;
}
.pop-good-right {
  width: 90px;
  height: 70px;
  flex: 2;
}
</style>
